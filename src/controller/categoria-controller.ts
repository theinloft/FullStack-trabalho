import { Request, Response, Router } from "express";
import { CategoriaService } from "../service/categoria-service";

export class CategoriaController {
  private service: CategoriaService;

  constructor(service: CategoriaService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const categoria = req.body;
    try {
      const novaCategoria = await this.service.inserir(categoria);
      res.status(201).json(novaCategoria);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  buscarPorId = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
      const categoria = await this.service.buscarPorId(id);
      res.json(categoria);
    } catch (err: any) {
      res.status(err.id || 500).json({
        error: err.msg || "Erro ao buscar categoria",
      });
    }
  };
  atualizar = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    const id = parseInt(req.params.id);

    if (!id) {
      res.status(400).json({ message: "ID é obrigatório" });
      return;
    }

    const { id: _, ...categoria } = req.body;

    try {
      const resultado = await this.service.atualizar(id, categoria);
      res.json(resultado);
    } catch (err: any) {
      res.status(err.id || 500).json({
        message: err.msg || "Erro ao atualizar categoria",
      });
    }
  };

  deletar = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
      res.json(await this.service.deletar(id));
    } catch (err: any) {
      res.status(err.id || 500).json({
        error: err.msg || "Erro ao deletar categoria",
      });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const listaCategorias = await this.service.listar();
    res.json(listaCategorias);
  };
}
