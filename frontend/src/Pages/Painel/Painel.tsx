import { useEffect, useState } from "react";
import styles from "./Painel.module.css";

type Cliente = {
  id: string;
  nome: string;
  email: string;
};

type Produto = {
  id: string;
  nome: string;
  preco: number;
};

type Pedido = {
  id: string;
  HorarioPedido: string;
};

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

  return { data, erro };
}

export default function Painel() {
  const { data: clientes } = useApi<Cliente[]>(
    "http://localhost:3000/api/clientes",
  );
  const { data: produtos } = useApi<Produto[]>(
    "http://localhost:3000/api/produtos",
  );
  const { data: pedidos } = useApi<Pedido[]>(
    "http://localhost:3000/api/pedidos",
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <span className={styles.tag}>Painel</span>
          <h1 className={styles.titulo}>
            Pedidos,Produtos e clientes
            <span className={styles.destaque}> Dashboard</span>
          </h1>
        </div>
      </header>

      {/* KPIs */}
      <div className={styles.kpis}>
        <div className={styles.kpi}>
          <span className={styles.kpiNum}>{pedidos?.length ?? "—"}</span>
          <span className={styles.kpiLabel}>PEDIDOS</span>
        </div>
        <div className={styles.kpi}>
          <span className={`${styles.kpiNum} ${styles.amarelo}`}>
            {clientes?.length ?? "—"}
          </span>
          <span className={styles.kpiLabel}>CLIENTES</span>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiNum}>{produtos?.length ?? "—"}</span>
          <span className={styles.kpiLabel}>PRODUTOS</span>
        </div>
      </div>

      {/* Grid principal */}
      <div className={styles.grid}>
        {/* Pedidos */}
        <section className={styles.secao}>
          <div className={styles.secaoHead}>
            <span className={styles.secaoTitulo}>PEDIDOS RECENTES</span>
          </div>
          <div className={styles.tableHead}>
            <span>ID</span>
            <span>DATA</span>
          </div>
          {pedidos?.map((p) => (
            <div key={p.id} className={styles.row}>
              <span className={styles.celula}>{p.id.substring(0, 8)}...</span>
              <span className={styles.celulaSecundaria}>
                {new Date(p.HorarioPedido).toLocaleDateString("pt-BR")}
              </span>
            </div>
          ))}
        </section>

        {/* Clientes */}
        <section className={styles.secao}>
          <div className={styles.secaoHead}>
            <span className={styles.secaoTitulo}>CLIENTES</span>
          </div>
          {clientes?.map((c) => (
            <div key={c.id} className={styles.clienteCard}>
              <div className={styles.avatar}>
                {c.nome.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className={styles.clienteNome}>{c.nome}</div>
                <div className={styles.clienteMeta}>{c.email}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Produtos */}
        <section className={styles.secao}>
          <div className={styles.secaoHead}>
            <span className={styles.secaoTitulo}>PRODUTOS</span>
          </div>
          <div className={styles.tableHead}>
            <span>NOME</span>
            <span>PREÇO</span>
          </div>
          {produtos?.map((p) => (
            <div key={p.id} className={styles.row}>
              <span className={styles.celula}>{p.nome}</span>
              <span className={styles.celulaSecundaria}>
                R$ {Number(p.preco).toFixed(2)}
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
