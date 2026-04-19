import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Produto } from "./produto";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    categoria?: string;
    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto?: Produto[];
}