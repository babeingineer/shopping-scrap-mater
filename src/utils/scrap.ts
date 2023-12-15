import puppeteer from "puppeteer";
import axios from "axios";
// const URL = `https://kaspi.kz/shop/search/?text=%D0%B1%D1%80%D0%B5%D0%BD%D0%B4%D1%8B%20%D0%BF%D0%BE%D0%B4%D0%B3%D1%83%D0%B7%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2&q=%3AavailableInZones%3AMagnum_ZONE1&sort=relevance&filteredByCategory=true&sc=`;
// export async function scrap() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto(URL, { waitUntil: 'networkidle0' });
//     // await page.waitForSelector('.item-cards-grid__cards', { visible: true });


//     const grid = await page.$(".item-cards-grid__cards");
//     const res = [];
//     if (grid != null) {
//         const items = await grid.$$(".item-card");
//         for (const item of items) {
//             const imageObject = await item.$(".item-card__image");
//             const nameObject = await item.$(".item-card__name");
//             const priceObject = await item.$(".item-card__prices-price");
//             let image, name, price;
//             if(imageObject != null)
//                 image = await imageObject.evaluate((el: any) => el.src);
//             if(nameObject != null)
//                 name = await nameObject.evaluate(el => el.textContent);
//             if(priceObject != null)
//                 price = await priceObject.evaluate(el => el.textContent);
//             console.log(`name: ${name} image: ${image} price: ${price}`);
//             res.push({name, price, image, date: new Date()});
//         }
//     }

//     await browser.close();
//     return res;
// }
const URL = `https://search.wb.ru/exactmatch/ru/common/v4/search?TestGroup=sim_goods_rec_infra&TestID=367&appType=1&curr=rub&dest=-1257786&query=%D0%B1%D1%80%D0%B5%D0%BD%D0%B4%D1%8B%20%D0%BF%D0%BE%D0%B4%D0%B3%D1%83%D0%B7%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2&resultset=catalog&sort=popular&spp=27&suppressSpellcheck=false`;
export async function scrap() {
    const data = (await axios(URL)).data;
    const items = data.data.products;
    const res = [];
    for(const item of items) {
        res.push({
            name: item.name,
            price: item.salePriceU,
            date: new Date(),
            image: ""
        })
    }
    return res;

}