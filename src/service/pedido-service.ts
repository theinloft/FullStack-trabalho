import { In, Repository } from "typeorm";
import { Pedido } from "../entity/pedido";
import { PedidoRepository } from "../repository/pedido-repository";
import { Categoria } from "../entity/categoria";
import { Produto } from "../entity/produto";
import { Cliente } from "../entity/cliente";

export class PedidoService {
  private repository: Repository<Pedido>;
  private clienteRepository: Repository<Cliente>;
  private produtoRepository: Repository<Produto>;

  constructor(
    repository: Repository<Pedido>,
    clienteRepository: Repository<Cliente>,
    produtoRepository: Repository<Produto>,
  ) {
    this.repository = repository;
    this.clienteRepository = clienteRepository;
    this.produtoRepository = produtoRepository;
  }

 async inserir(body: any): Promise<Pedido> {
  const { clienteId, itens } = body;

  if (!clienteId || !itens || itens.length === 0) {
    throw { status: 400, message: "Falta dados obrigatorios de pedido" };
  }

  const cliente = await this.clienteRepository.findOneBy({ id: clienteId });

  if (!cliente) {
    throw { status: 404, message: "Cliente não encontrado" };
  }

  const pedido = new Pedido();
  pedido.cliente = cliente;
  pedido.HorarioPedido = new Date();
  pedido.itens = [];

  for (const item of itens) {
    const produto = await this.produtoRepository.findOneBy({
      id: item.produtoId
    });

    if (!produto) {
      throw { status: 404, message: "Produto não encontrado" };
    }

    pedido.itens.push({
      produto,
      quantidade: item.quantidade,
      preco: produto.preco
    });
  }

  return await this.repository.save(pedido);
}

 async listar(): Promise<Pedido[]> {
  return await this.repository.find({
    relations: {
      cliente: true,
      itens: {
        produto: true
      }
    }
  });
}

 async buscarPorId(id: string): Promise<Pedido> {
  const pedido = await this.repository.findOne({
    where: { id },
    relations: {
      cliente: true,
      itens: {
        produto: true
      }
    }
  });

  if (!pedido) {
    throw { status: 404, message: "Pedido não encontrado" };
  }

  return pedido;
}
}
