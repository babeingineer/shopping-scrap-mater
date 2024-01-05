import express from "express";
import { PORT } from "./config";
import { AppDataSouce } from "./data-source";
import { scrap } from "./utils/scrap";
import { Price } from "./entity/Price";
import { Product } from "./entity/Product";
import { CronJob } from "cron";
import cors from "cors";
import { Search } from "./entity/Search";
import TelegramBot from "node-telegram-bot-api"
const chatId = 5606616629;
const bot = new TelegramBot(`6963470189:AAFy05DQBIH3nntGsrskV0xxeeafNBxYIg0`, {polling: true});

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   console.log(msg);
//   // send a message to the chat acknowledging receipt of their message  
//   bot.sendMessage(chatId, 'Received your message');
// });

scrap();

// AppDataSouce.initialize()
//   .then(async () => {
//     console.log("Database connected");

//     const productRepository = AppDataSouce.getRepository(Product);
//     const priceRepository = AppDataSouce.getRepository(Price);
//     const searchRepository = AppDataSouce.getRepository(Search);

//     async function findObject(search: Search) {
//       let res = await scrap(search);
//       if (typeof res == "object") {
//         for (const item of res) {
//           if (!(await productRepository.exist({where: { size: item.size as string, search: search }}))) {
//             const product: Product = {
//               size: item.size as string,
//               image: item.image,
//               search: search,
//             };
//             await productRepository.save(product);
//           }
//           const product = (await productRepository.findOne({
//             where: { size: item.size as string, search: search },
//             relations: { search: true}
//           })) as Product;
//           if(product.latest != null && product.latest != item.price as string) {
//              bot.sendMessage(chatId, `The price of Product ${product.search?.name} size ${product.size} changed from ${product.latest} to ${item.price as string}`);
//           }
//           product.latest = item.price as string;
//           await productRepository.save(product);
//           const price: Price = {
//             price: item.price as string,
//             date: item.date,
//             product: product as Product,
//           };
//           await priceRepository.save(price);
//         }
//         return 1;
//       }
//       else return 0;
//     }

//     const job = new CronJob(
//       "0 0 0 * * *",
//       async () => {
//         let searches: Search[] = await searchRepository.find();
//         console.log(searches);
//         for (const search of searches) {
//           findObject(search);
//         }
//       },
//       null,
//       true,
//       "America/Los_Angeles"
//     );

//     const app = express();
//     app.use(cors());
//     app.use(express.json());
//     app.get("/products", async (req, res) => {
//       const products: Product[] = await searchRepository.find({
//         relations: {
//           products: true,
//         },
//       });
//       res.send(products);
//     });
//     app.get("/prices/:productId", async (req, res) => {
//       // const name = req.query.name;
//       if (
//         await productRepository.exist({
//           where: { id: Number(req.params.productId) },
//         })
//       ) {
//         const product: Product = (await productRepository.findOne({
//           where: { id: Number(req.params.productId) },
//           relations: { prices: true },
//         })) as Product;
//         res.send(product.prices);
//       } else res.send("Invalid id");
//     });
//     app.post("/search", async (req, res) => {
//       console.log(req.body);
//       let search = await searchRepository.save(req.body);
//       try {
//         if(await findObject(search)) res.send("success");
//         else res.send("url not available"), await searchRepository.remove(search);
//       } catch (err) {
//         res.send(err);
//         await searchRepository.remove(search);
//       }
//     });

//     app.listen(PORT, () => {
//       console.log(`Listening on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));
