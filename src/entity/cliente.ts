import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn("uuid")
  id?: string;
  @Column()
  nome?: string;
  @Column()
  email?: string;

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedido?: Pedido[];
}
