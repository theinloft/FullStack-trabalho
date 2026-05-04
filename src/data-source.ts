import { DataSource } from "typeorm";
import { Produto } from "./entity/produto";
import { Categoria } from "./entity/categoria";
import { Cliente } from "./entity/cliente";
import { Pedido } from "./entity/pedido";
import { PedidoItem } from "./entity/PedidoItem";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "crud-produtos",
    entities: [Produto, Categoria,Cliente,Pedido,PedidoItem],
    logging: true,
    synchronize: true,
})