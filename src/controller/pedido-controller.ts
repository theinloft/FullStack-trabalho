import { Request, Response } from "express";
import { PedidoService } from "../service/pedido-service";
import { ok } from "assert";

export class PedidoController {
  private service: PedidoService;

  constructor(service: PedidoService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const pedido = req.body;

    try {
      const novoPedido = await this.service.inserir(pedido);
      res.status(201).json(novoPedido);
    } catch (err: any) {
      res.status(err.status || 500).json({
        error: err.message || "Erro ao criar pedido",
      });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const listaPedidos = await this.service.listar();
    res.json(listaPedidos);
  };

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    try {
      const pedido = await this.service.buscarPorId(id);
      res.json(pedido);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  atualizarStatus = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    console.log("atualizarStatus chamado!", req.params.id, req.body);

    if (
      status !== "andamento" &&
      status !== "concluido" &&
      status !== "cancelado"
    ) {
      res.status(400).json({ error: "Status inválido" });
      return;
    }

    try {
      res.json(await this.service.atualizarStatus(id, status));
    } catch (err: any) {
      res
        .status(err.status || 500)
        .json({ error: err.message || "Erro ao atualizar status" });
    }
  };

  editarPedido = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    const { id } = req.params;
    const body = req.body;

    try {
      res.json(await this.service.editarPedido(id, body));
    } catch (err: any) {
      res
        .status(err.status || 500)
        .json({ error: err.message || "Erro ao editar pedido" });
    }
  };
}
