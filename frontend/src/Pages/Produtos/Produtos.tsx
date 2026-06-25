import styles from "./Produtos.module.css";
import Paginacao from "../../components/Paginacao/Paginacao";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";

const POR_PAGINA = 5;

type Categoria = {
  id: number;
  categoria: string;
};

type Produto = {
  id: string;
  nome: string;
  preco: number;
  categoria?: Categoria;
};

function paginar<T>(lista: T[], pagina: number) {
  const inicio = (pagina - 1) * POR_PAGINA;
  return lista.slice(inicio, inicio + POR_PAGINA);
}

function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then(setData)
      .catch((e) => setErro(e.message));
  }, [url]);

  return { data, erro, setData };
}

export default function Produtos() {
  const [pagProdutos, setPagProdutos] = useState(1);

  const [editando, setEditando] = useState<Produto | null>(null);

  const [criando, setCriando] = useState(false);

  const [form, setForm] = useState({ nome: "", preco: 0, categoriaId: 0 });

  const { data: categorias } = useApi<Categoria[]>(
    "http://localhost:3000/api/categorias",
  );

  const { data: produtos, setData: setProdutos } = useApi<Produto[]>(
    "http://localhost:3000/api/produtos",
  );

  const camposProduto = [
    { label: "NOME", chave: "nome" },
    { label: "PREÇO", chave: "preco", tipo: "number" },
    {
      label: "CATEGORIA",
      chave: "categoriaId",
      tipo: "select",
      opcoes:
        categorias?.map((c) => ({ label: c.categoria, value: c.id })) ?? [],
    },
  ];

  const token = localStorage.getItem("token");

  function abrirEdicao(p: Produto) {
    setEditando(p);
    setForm({
      nome: p.nome,
      preco: p.preco,
      categoriaId: p.categoria?.id || 0,
    });
  }

  async function salvarEdicao() {
    if (!editando) return;
    await fetch(`http://localhost:3000/api/produtos/${editando.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    setProdutos((prev) =>
      prev
        ? prev.map((p) => (p.id === editando.id ? { ...p, ...form } : p))
        : prev,
    );
    setEditando(null);
  }

  async function excluir(id: string) {
    if (!confirm("Excluir produto?")) return;
    await fetch(`http://localhost:3000/api/produtos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setProdutos((prev) => (prev ? prev.filter((p) => p.id !== id) : prev));
  }

  async function criarProduto() {
    const res = await fetch("http://localhost:3000/api/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const novo = await res.json();
    setProdutos((prev) => (prev ? [...prev, novo] : [novo]));
    setCriando(false);
    setForm({ nome: "", preco: 0, categoriaId: 0 });
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>PRODUTOS</h1>
        <button
          className={styles.btnNovo}
          onClick={() => {
            setCriando(true);
            setForm({ nome: "", preco: 0, categoriaId: 0 });
          }}
        >
          + NOVO PRODUTO
        </button>
      </div>
      {/* Produtos */}

      <section className={styles.secao}>
        <div className={styles.secaoHead}></div>
        <div className={styles.tableHead}>
          <span>NOME</span>
          <span>PREÇO</span>
          <span>CATEGORIA</span>
          <span>AÇÕES</span>
        </div>
        {paginar(produtos ?? [], pagProdutos).map((p) => (
          <div key={p.id} className={styles.row}>
            <span className={styles.celula}>{p.nome}</span>
            <span className={styles.celulaSecundaria}>
              R$ {Number(p.preco).toFixed(2)}
            </span>
            <span className={styles.celulaSecundaria}>
              {p.categoria?.categoria ?? "—"}
            </span>
            <span className={styles.celulaAcoes}>
              <button
                className={styles.btnEditar}
                onClick={() => abrirEdicao(p)}
              >
                EDITAR
              </button>
              <button
                className={styles.btnExcluir}
                onClick={() => excluir(p.id)}
              >
                EXCLUIR
              </button>
            </span>
          </div>
        ))}
        <Paginacao
          pagina={pagProdutos}
          total={produtos?.length ?? 0}
          porPagina={POR_PAGINA}
          onChange={setPagProdutos}
        />
      </section>
      {editando && (
        <Modal
          titulo="EDITAR PRODUTO"
          campos={camposProduto}
          form={form}
          onChange={(chave, valor) =>
            setForm((f) => ({ ...f, [chave]: valor }))
          }
          onConfirmar={salvarEdicao}
          onCancelar={() => setEditando(null)}
          labelConfirmar="SALVAR"
        />
      )}
      {criando && (
        <Modal
          titulo="NOVO PRODUTO"
          campos={camposProduto}
          form={form}
          onChange={(chave, valor) =>
            setForm((f) => ({ ...f, [chave]: valor }))
          }
          onConfirmar={criarProduto}
          onCancelar={() => setCriando(false)}
          labelConfirmar="CRIAR"
        />
      )}
    </div>
  );
}
