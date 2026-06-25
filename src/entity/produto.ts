import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Categoria } from "./categoria";

@Entity()
export class Produto {
  @PrimaryGeneratedColumn("uuid")
  id?: string;
  @Column()
  nome?: string;
  @Column({ type: "decimal" })
  preco?: number;
  @Column({ nullable: true })
  imagem?: string;
  @ManyToOne(() => Categoria, (categoria) => categoria.produto)
  categoria?: Categoria;
}
