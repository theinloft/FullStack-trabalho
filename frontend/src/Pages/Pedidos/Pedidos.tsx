import { useState } from "react";
import styles from "./Pedidos.module.css";
import { useApi } from "../../hooks/useApi";
import Paginacao from "../../components/Paginacao/Paginacao";
import { paginar } from "../../utils/utils";
import Modal from "../../components/Modal/Modal";
import ModalConfirmar from "../../components/ModalConfirmar/ModalConfirmar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const POR_PAGINA = 5;

type Produto = {
  id: string;
  nome: string;
  qtde: number;
};

type Pedido = {
  id: string;
  cliente?: Cliente;
  HorarioPedido: string;
  itens: Produto[];
};

export default function Pedido() {
  const [erro, setErro] = useState("");
  const [pagPedidos, setPagProdutos] = useState(1);
  const [confirmarExcluir, setConfirmarExcluir] = useState<string | null>(null);
  const [confirmarAcao, setConfirmarAcao] = useState<{
    id: string;
    status: "andamento" | "concluido" | "cancelado";
  } | null>(null);

  const { data: pedidos, setData: setPedidos } = useApi<Pedido[]>(
    "http://localhost:3000/api/pedidos",
  );

  const { data: produtos, setData: setProdutos } = useApi<Produto[]>(
    "http://localhost:3000/api/produtos",
  );

  const navigate = useNavigate();

  function abrirEdicao(p: Pedido) {
    navigate(`/pedidos/editar/${p.id}`);
  }

  const [confirmarCancelarPedido, setConfirmarCancelarPedido] = useState<{
    id: string;
    status: "andamento" | "concluido" | "cancelado";
  } | null>(null);

  async function atualizarStatus(
    id: string,
    status: "andamento" | "concluido" | "cancelado",
  ) {
    await fetch(`http://localhost:3000/api/pedidos/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    setPedidos((prev) =>
      prev ? prev.map((p) => (p.id === id ? { ...p, status } : p)) : prev,
    );
    setConfirmarCancelarPedido(null);
  }

  const token = localStorage.getItem("token");

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Pedidos</h1>
        <button
          className={styles.btnNovo}
          onClick={() => navigate("/pedidos/novo")}
        >
          + NOVO PEDIDO
        </button>
      </div>
      <div>
        <div>
          <section className={styles.secao}>
            <div className={styles.secaoHead}></div>
            <div className={styles.tableHead}>
              <span>CLIENTE</span>
              <span>DATA/HORA</span>
              <span>NUMERO DO PEDIDO</span>
              <span>AÇÕES</span>
            </div>
            {paginar(pedidos ?? [], pagPedidos, POR_PAGINA).map((p) => (
              <div key={p.id} className={styles.row}>
                <span
                  className={styles.celula}
                  onClick={() => setVisualizando(p)}
                >
                  {p.cliente?.nome ?? "—"}
                </span>
                <span className={styles.celulaSecundaria}>
                  {format(new Date(p.HorarioPedido), "dd/MM/yyyy HH:mm", {
                    locale: ptBR,
                  })}
                </span>
                <span className={styles.celulaSecundaria}>{p.id}</span>
                <span className={styles.celulaAcoes}>
                  <button
                    className={styles.btnEditar}
                    onClick={() => abrirEdicao(p)}
                  >
                    EDITAR
                  </button>
                  <button
                    className={styles.btnCancelar}
                    onClick={() =>
                      setConfirmarCancelarPedido({
                        id: p.id!,
                        status: "cancelado",
                      })
                    }
                  >
                    CANCELAR PEDIDO
                  </button>
                  <button
                    className={styles.btnConcluir}
                    onClick={() =>
                      setConfirmarCancelarPedido({
                        id: p.id!,
                        status: "concluido",
                      })
                    }
                  >
                    CONCLUIR PEDIDO
                  </button>
                </span>
              </div>
            ))}
            <Paginacao
              pagina={pagPedidos}
              total={pedidos?.length ?? 0}
              porPagina={POR_PAGINA}
              onChange={setPagProdutos}
            />

            {confirmarCancelarPedido && (
              <ModalConfirmar
                mensagem={`Deseja ${confirmarCancelarPedido.status === "cancelado" ? "cancelar" : "concluir"} este pedido?`}
                onConfirmar={() =>
                  atualizarStatus(
                    confirmarCancelarPedido.id,
                    confirmarCancelarPedido.status,
                  )
                }
                onCancelar={() => setConfirmarCancelarPedido(null)}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
