import { useState } from 'react';
import styles from './Pedidos.module.css'


const POR_PAGINA = 5;

type Produto = {
  id: string;
  nome: string;
  qtde: number;
}

type Pedido = {
    id: string;
    clienteId: string;
    itens:Produto[]
}

export default function Pedido(){
 const [erro, setErro] = useState("");
   const [pagProdutos, setPagProdutos] = useState(1);
   const [visualizando, setVisualizando] = useState<Pedido | null>(null);
 
   const [editando, setEditando] = useState<Pedido | null>(null);
    
   const [criando, setCriando] = useState(false);
   const [confirmarExcluir, setConfirmarExcluir] = useState<string | null>(null);
 
   const [form, setForm] = useState({ nome: "", preco: 0, categoriaId: 0 });
 

   const { data: pedidos, setData: setPedidos } = useApi<Pedido[]>(
       "http://localhost:3000/api/pedidos",
     );
   
     const { data: produtos, setData: setProdutos } = useApi<Produto[]>(
       "http://localhost:3000/api/produtos",
     );

       const camposPedido = [
    { label: "NOME CLIENTE", chave: "nome" },
    { label: "Data", chave: "preco", tipo: "number" },
    {
      label: "CATEGORIA",
      chave: "categoriaId",
      tipo: "select",
      opcoes:
        categorias?.map((c) => ({ label: c.categoria, value: c.id })) ?? [],
    },
  ];

  const token = localStorage.getItem("token");


    return (
        <h1>Pedidos</h1>
    );
}