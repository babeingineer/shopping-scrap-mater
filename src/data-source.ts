import { DataSource } from "typeorm";
import { Product } from "./entity/Product";
import { Price } from "./entity/Price"
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USERNAME,
} from "./config";
export const AppDataSouce = new DataSource({
  type: DB_TYPE as "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Product, Price],
  synchronize: true,
  logging: false,
});
