import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "./produto";
import { Pedido } from "./pedido";

@Entity()
export class PedidoItem {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ManyToOne(() => Pedido, (pedido) => pedido.itens)
  pedido?: Pedido;

  @ManyToOne(() => Produto)
  produto?: Produto;

  @Column()
  quantidade?: number;

  @Column("decimal")
  preco?: number;
}