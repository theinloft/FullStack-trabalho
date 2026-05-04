import { Cliente } from "./../entity/cliente";
import { Repository } from "typeorm";

export class ClienteService {
  private repository: Repository<Cliente>;

  constructor(repository: Repository<Cliente>) {
    this.repository = repository;
  }

  async inserir(cliente: Cliente): Promise<Cliente> {
    if (!Cliente || !cliente.nome || !cliente.email) {
      throw { id: 400, msg: "Falta dados obrigatorios de cliente" };
    }

    return await this.repository.save(cliente);
  };

    async listar(): Promise<Cliente[]> {
        return await this.repository.find({relations:{pedido:true}});
    };

    async buscarPorId(id: string): Promise<Cliente> {
        let cliente = await this.repository.findOne({
            where: {id:id},
            relations:{pedido:true}
        });
        if(!cliente) {
            throw({id: 404, msg:"Cliente nao encontrado!"})
        }
        return cliente;
    };

    async atualizar(id:string, clienteAlterado: Cliente): Promise<Cliente> {
        if(clienteAlterado && clienteAlterado.nome && clienteAlterado.email) {
            const cliente = await this.repository.findOneBy({id:id});
            if(cliente) {
                cliente.nome = clienteAlterado.nome;
                cliente.email = clienteAlterado.email;
                await this.repository.save(cliente);
                return cliente;
            }
            else {
                throw {id:404, msg: "Cliente não encontrado"};
            }
        }
        else {
            throw {id:400, msg: "Cliente sem dados corretos"};
        }
    };

    async deletar(id:string) {
        let cliente = await this.repository.findOneBy({id:id});
        if(cliente) {
            await this.repository.delete({id:id});
            return cliente;
        }
        else {
            throw { id: 404, msg: "Cliente não encontrado!" }
        }

    };
}
