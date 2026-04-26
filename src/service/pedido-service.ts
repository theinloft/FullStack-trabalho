import { Repository } from "typeorm";
import { Pedido } from "../entity/pedido";
import { PedidoRepository } from "../repository/pedido-repository";
import { Categoria } from "../entity/categoria";

export class PedidoService {
    private repository: Repository<Pedido>;

    constructor(repository: Repository<Pedido>){
        this.repository = repository;
    }

    async inserir(pedido: Pedido): Promise<Pedido> {
        if(!Pedido || !pedido.produto || !pedido.cliente ) {
            throw({id:400, msg: "Falta dados obrigatorios de pedido"});            
        }
        pedido.HorarioPedido = new Date();

        return await this.repository.save(pedido);
    }

    async listar(): Promise<Pedido[]> {
        return await this.repository.find({
            relations:{cliente:true}
        });
    }

    async buscarPorId(id: string): Promise<Pedido> {
        let pedido = await this.repository.findOne({
             where: {id:id},
            relations:{
                cliente:true,
                produto:{
                categoria: true
                }
            }
        }
        );
        if(!pedido) {
            throw({id: 404, msg:"Pedido nao encontrado!"})
        }
        return pedido;
    }


}
