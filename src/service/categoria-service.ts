import { Categoria } from "./../entity/categoria";
import { Repository } from "typeorm";

export class CategoriaService {
  private repository: Repository<Categoria>;

  constructor(repository: Repository<Categoria>) {
    this.repository = repository;
  }

  async inserir(categoria: Categoria): Promise<Categoria> {
    if (!categoria || !categoria.categoria) {
      throw { id: 400, msg: "Falta dados obrigatorios de categoria" };
    }

    return await this.repository.save(categoria);
  }

  async listar(): Promise<Categoria[]> {
    return await this.repository.find();
  }

  async buscarPorId(id: number): Promise<Categoria> {
    let categoria = await this.repository.findOne({
      where: { id: id },
      relations: { produto: true },
    });
    if (!categoria) {
      throw { id: 404, msg: "Categoria nao encontrada!" };
    }
    return categoria;
  }

  async atualizar(
    id: number,
    categoriaAlterada: Categoria,
  ): Promise<Categoria> {
    if (categoriaAlterada && categoriaAlterada.categoria) {
      const categoria = await this.repository.findOneBy({ id: id });
      if (categoria) {
        categoria.categoria = categoriaAlterada.categoria;
        await this.repository.save(categoria);
        return categoria;
      } else {
        throw { id: 404, msg: "Categoria não encontrada" };
      }
    } else {
      throw { id: 400, msg: "Categoria sem dados corretos" };
    }
  }

  async deletar(id: number) {
    let categoria = await this.repository.findOneBy({ id: id });
    if (categoria) {
      await this.repository.delete({ id: id });
      return categoria;
    } else {
      throw { id: 404, msg: "Categoria não encontrada!" };
    }
  }
}
