import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Search {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text")
  url!: string;

  @Column("text")
  name!: string;

  @OneToMany(() => Product, (product: Product) => product.search)
  products?: Product[];
}
