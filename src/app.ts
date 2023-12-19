import express from "express";
import { PORT } from "./config";
import { AppDataSouce } from "./data-source";
import { scrap } from "./utils/scrap";
import { Price } from "./entity/Price";
import { Product } from "./entity/Product";
import { CronJob } from "cron";
import cors from "cors";
const URLS = [
  `https://www.ozon.ru/product/podguzniki-trusiki-razmer-xl-12-22-kg-38-sht-142813716/?asb=SY7oYTnb80ZkDO%252BGAwa50MOsGsEj1M0MUYKqcw4P1oA%253D&asb2=rHrg14z2vaqGRQil_3yzHG44LBFX_Dagatmi0FBHipZW3pwph0hpK9p9SgHftmRr&avtc=1&avte=1&avts=1702972136`,
  `https://www.ozon.ru/product/offspring-podguzniki-trusiki-detskie-dlya-malchikov-i-devochek-razmer-l-9-14-kg-36-sht-rastsvetka-150445350/?asb=%252FLjZPAyCx0yxTopFsAiPbcFa2B3ZGMOiA%252BDrekAOmvg%253D&asb2=Muqwz41iPoLvm1ZObSBCBHROEVBBD8e0be2stuDuYjvAChYrfeeW5JDGwVD60tCN&avtc=1&avte=2&avts=1702797595`,
];

AppDataSouce.initialize()
  .then(async () => {
    console.log("Database connected");

    const productRepository = AppDataSouce.getRepository(Product);
    const priceRepository = AppDataSouce.getRepository(Price);

    // const job = new CronJob(
    //   "0 * * * * *",
    //   async () => {
        for (const url of URLS) {
          let res = await scrap(url);
          if (typeof res == "object")
            for (const item of res) {
              if (
                !(await productRepository.exist({
                  where: { size: item.size as string, name: url },
                }))
              ) {
                const product: Product = {
                  size: item.size as string,
                  image: item.image,
                  name: url,
                };
                await productRepository.save(product);
              }
              const product = await productRepository.findOne({
                where: { size: item.size as string, name: url },
              });
              const price: Price = {
                price: item.price as string,
                date: item.date,
                product: product as Product,
              };
              await priceRepository.save(price);
            }
          else console.log(`Scrap to ${url} failed`);
        }
      // },
    //   null,
    //   true,
    //   "America/Los_Angeles"
    // );

    const app = express();
    app.use(cors());
    app.get("/products", async (req, res) => {
      const products: Product[] = await productRepository.find();
      res.send(products);
    });
    app.get("/prices", async (req, res) => {
      const name = req.query.name;
      const size = req.query.size;
      const product = await productRepository.findOne({
        where: { name: name as string, size: size as string },
        relations: { prices: true },
      });
      console.log(product);
      res.send(product?.prices);
    });

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
