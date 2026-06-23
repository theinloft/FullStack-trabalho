import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/usuario";

export class UsuarioRepository {
  private repo = AppDataSource.getRepository(Usuario);

  async criar(dados: { nome: string; email: string; senha: string }) {
    const usuario = this.repo.create(dados);
    return this.repo.save(usuario);
  }

  async buscarPorEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async buscarPorId(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async listar() {
    return this.repo.find({
      select: ["id", "nome", "email", "perfil"],
    });
  }
}
