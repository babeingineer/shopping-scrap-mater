import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(() => Product, (product: Product) => product.id)
  product?: Product;

  @Column("text")
  price?: string;

  @Column("timestamp")
  date?: Date;
}
