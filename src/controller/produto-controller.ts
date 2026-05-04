import { Request, Response } from "express";
import { ProdutoService } from "../service/produto-service";

export class ProdutoController {
  private service: ProdutoService;

  constructor(service: ProdutoService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const produto = req.body;
    try {
      const novoProduto = await this.service.inserir(produto);
      res.status(201).json(novoProduto);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const listaProdutos = await this.service.listar();
    res.json(listaProdutos);
  };

 buscarPorId = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;

  try {
    const produto = await this.service.buscarPorId(id);
    res.json(produto);
  } catch (err: any) {
    res.status(err.status || 500).json({
      error: err.message || "Erro ao buscar produto"
    });
  }
};

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    if (!id) {
      res.status(400).json({ message: "ID é obrigatório" });
      return;
    }

    const { id: _, ...produto } = req.body;

    try {
      const resultado = await this.service.atualizar(id, produto);
      res.json(resultado);
    } catch (err: any) {
      res.status(err.status || 500).json({
        message: err.message || "Erro ao atualizar produto",
      });
    }
  };

  deletar = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    try {
      res.json(await this.service.deletar(id));
    } catch (err: any) {
      res.status(err.status || 500).json({
        error: err.message || "Erro ao deletar produto"
      });
    }
  };
}
