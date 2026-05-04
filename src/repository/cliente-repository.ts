import { Cliente } from './../entity/cliente';

export interface ClienteRepository {
    inserir(cliente: Omit<Cliente, 'id'>): Promise<Cliente>; 
    listar(): Promise<Cliente[]>;
    buscarPorId(id: string): Promise<Cliente | undefined>;
    atualizar(id: string, cliente: Cliente): Promise<Cliente | undefined>;
    deletar(id: string): Promise<Cliente | undefined>;
}