import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import { Produto } from "./produto";
import { Cliente } from "./cliente";
import { PedidoItem } from "./PedidoItem";

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column("timestamp")
  HorarioPedido?: Date;

  @ManyToMany(() => Produto)
  @JoinTable()
  produto?: Produto[];

  @ManyToOne(() => Cliente)
  cliente?: Cliente;

  @OneToMany(() => PedidoItem, (item) => item.pedido, {
  cascade: true
})
itens?: PedidoItem[];
}
