import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cliente } from "./cliente";
import { PedidoItem } from "./PedidoItem";

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column("timestamp")
  HorarioPedido?: Date;

  @ManyToOne(() => Cliente)
  cliente?: Cliente;

  @OneToMany(() => PedidoItem, (item) => item.pedido, {
    cascade: true,
  })
  itens?: PedidoItem[];

  @Column({ default: "andamento" })
  status?: "andamento" | "concluido" | "cancelado";
}
