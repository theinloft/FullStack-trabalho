import { UsuarioService } from "../service/usuario-service";
import { Request, Response } from "express";

export class UsuarioController {
  constructor(private service: UsuarioService) {}

  async cadastrar(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ message: "Nome, email e senha são obrigatórios." });
      }

      const usuario = await this.service.cadastrar(nome, email, senha);
      return res.status(201).json(usuario);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios." });
      }

      const resultado = await this.service.login(email, senha);
      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const usuarios = await this.service.listar();
      return res.status(200).json(usuarios);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
