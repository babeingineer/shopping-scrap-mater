import express from "express";
import { PORT } from "./config";
import { AppDataSouce } from "./data-source";
import { scrap } from "./utils/scrap";
import { Price } from "./entity/Price";
import { Product } from "./entity/Product";
import { CronJob } from "cron";

AppDataSouce.initialize()
  .then(async () => {
    console.log("Database connected");


    // const job = new CronJob(
    //   '0 0 0 * * *',
    //   async () => {
        const productRepository = AppDataSouce.getRepository(Product);
        const priceRepository = AppDataSouce.getRepository(Price);
        let res = await scrap();
        for(const item of res) {
          if(!await productRepository.exist({where:{name: item.name as string}}))
          {
            const product:Product = {
              name: item.name as string,
              image: item.image
            }
            await productRepository.save(product);
          }
          const product = await productRepository.findOne({where:{name: item.name as string}});
            const price:Price = {
              price: item.price as string,
              date: item.date,
              product: product as Product
            }
            await priceRepository.save(price);
        }
    //   },
    //   null,
    //   true,
    //   'America/Los_Angeles'
    // )
    
    
    
    const app = express();
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
