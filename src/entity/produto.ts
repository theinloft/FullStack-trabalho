import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Categoria } from "./categoria";


@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    nome?: string;
    @Column({type:"decimal"})
    preco?: number;
    @ManyToOne(() => Categoria, (categoria) => categoria.produto)
    categoria?: Categoria;
}