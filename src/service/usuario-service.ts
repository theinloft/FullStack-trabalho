import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioRepository } from "../repository/usuario-repository";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_dev";

export class UsuarioService {
  constructor(private repo: UsuarioRepository) {}

  async cadastrar(nome: string, email: string, senha: string) {
    const hash = await bcrypt.hash(senha, 10);
    return this.repo.criar({ nome, email, senha: hash });
  }

  async login(email: string, senha: string) {
    const usuario = await this.repo.buscarPorEmail(email);
    if (!usuario) throw new Error("Usuário não encontrado");

    if (!usuario.senha) throw new Error("Usuário sem senha cadastrada"); // ← adiciona isso

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) throw new Error("Senha incorreta");

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, perfil: usuario.perfil },
      JWT_SECRET,
      { expiresIn: "8h" },
    );

    return {
      token,
      usuario: { id: usuario.id, nome: usuario.nome, perfil: usuario.perfil },
    };
  }

  async listar() {
    return this.repo.listar();
  }
}
