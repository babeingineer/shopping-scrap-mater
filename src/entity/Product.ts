import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./Price";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text")
  name?: string;

  @Column("text")
  size?: string;

  @Column("text")
  image?: string;

  @OneToMany(() => Price, (price: Price) => price.product)
  prices?: Price[];
}
