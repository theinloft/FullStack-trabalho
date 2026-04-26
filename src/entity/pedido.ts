import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Produto } from "./produto";
import { Cliente } from "./cliente";

@Entity()
export class Pedido{
    @PrimaryGeneratedColumn("uuid")
        id?: string;
    
    @Column("timestamp")
    HorarioPedido?:Date;

    @ManyToMany(()=>Produto)
    @JoinTable()
        produto?: Produto[];

    @ManyToOne(()=>Cliente)
        cliente?:Cliente;

    }
