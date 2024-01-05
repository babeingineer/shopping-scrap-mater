import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./Price";
import { Search } from "./Search";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text")
  size?: string;

  @Column("text")
  image?: string;

  @OneToMany(() => Price, (price: Price) => price.product)
  prices?: Price[];

  @ManyToOne(() => Search, (search: Search) => search.id)
  search?: Search;

  @Column("text", {nullable: true})
  latest?: string;
}
