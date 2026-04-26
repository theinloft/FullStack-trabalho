import { Pedido } from "../entity/pedido";

export interface PedidoRepository {
    inserir(pedido: Omit<Pedido, 'id'>): Promise<Pedido>; 
    listar(): Promise<Pedido[]>;
    buscarPorId(id: number): Promise<Pedido | undefined>;
    
    
}