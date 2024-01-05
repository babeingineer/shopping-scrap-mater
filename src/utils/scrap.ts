import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import fs from "fs";
import { Search } from "../entity/Search";
puppeteer.use(StealthPlugin());


const URL = `https://kaspi.kz/shop/search/?text=%D0%B1%D1%80%D0%B5%D0%BD%D0%B4%D1%8B%20%D0%BF%D0%BE%D0%B4%D0%B3%D1%83%D0%B7%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2&q=%3AavailableInZones%3AMagnum_ZONE1&sort=relevance&filteredByCategory=true&sc=`;
export async function scrap() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(URL, { waitUntil: 'networkidle0' });
    // await page.waitForSelector('.item-cards-grid__cards', { visible: true });

    const grid = await page.$(".item-cards-grid__cards");
    const res = [];
    if (grid != null) {
        const items = await grid.$$(".item-card");
        for (const item of items) {
            const imageObject = await item.$(".item-card__image");
            const nameObject = await item.$(".item-card__name");
            const priceObject = await item.$(".item-card__prices-price");
            let image, name, price;
            if(imageObject != null)
                image = await imageObject.evaluate((el: any) => el.src);
            if(nameObject != null)
                name = await nameObject.evaluate(el => el.textContent);
            if(priceObject != null)
                price = await priceObject.evaluate(el => el.textContent);
            console.log(`name: ${name} image: ${image} price: ${price}`);
            res.push({name, price, image, date: new Date()});
        }
    }

    await browser.close();
    return res;
}

// const URL = `https://search.wb.ru/exactmatch/ru/common/v4/search?TestGroup=sim_goods_rec_infra&TestID=367&appType=1&curr=rub&dest=-1257786&query=%D0%B1%D1%80%D0%B5%D0%BD%D0%B4%D1%8B%20%D0%BF%D0%BE%D0%B4%D0%B3%D1%83%D0%B7%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2&resultset=catalog&sort=popular&spp=27&suppressSpellcheck=false`;
// export async function scrap() {
//     const data = (await axios(URL)).data;
//     const items = data.data.products;
//     const res = [];
//     for(const item of items) {
//         res.push({
//             name: item.name,
//             price: item.salePriceU,
//             date: new Date(),
//             image: ""
//         })
//     }
//     return res;

// }


// export async function scrap(search: Search) {
//   // if (!browser) {
//   //     browser = await puppeteer.launch();
//   // }
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.setUserAgent(
//     `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.1234.56 Safari/537.36`
//   );
//   await page.setExtraHTTPHeaders({
//     "Cookie": `__cf_bm=IudYbUTDRqqGQMJnoQKWqB64ddeMsrptvnVPagFPw3o-1702924870-1-AcXdshw94jRJHjCoGLV3cOJYMiNDw8jsjPDRzgUL6cAVa/o3doPf5i1pq7Tum7q+ltpkowMIXxXvEewHq4oQA40=; __Secure-access-token=3.0.F_jSMx_6Rq2mXQ2Ip8TIjQ.25.l8cMBQAAAABlgJJJFh5bzqN3ZWKgAICQoA..20231218204113.H_mY6bLXWr2jDDbFb4Ers-eTxkNOUbo8vggEo_AFueM; __Secure-refresh-token=3.0.F_jSMx_6Rq2mXQ2Ip8TIjQ.25.l8cMBQAAAABlgJJJFh5bzqN3ZWKgAICQoA..20231218204113.tyYVz-ZUBoMetQM9Kldr56e75bpFaR2SuZ1CTyO5rKo; __Secure-ab-group=25; __Secure-user-id=0; cf_clearance=HnNWljrYXEYrjg3cQr1S5pm8W3MJYu5_vApOcOM._ac-1702924873-0-1-53202aad.d6fc745d.421754d-0.2.1702924873; xcid=48e9a3e56e65ec5956bb20693779f567; __Secure-ext_xcid=48e9a3e56e65ec5956bb20693779f567; abt_data=452c411e70fec378f19bb1bc2992befd:6e62141184e90cf58376e45ee6fee6cdeab50e96d0a8132afb1141ce9a5d6d3a9ec860ea6f47605c2563b8a955e11e8b8864b6a7491690af390f5be681fb8c8113acc8cc6a2352e70a75da30d019ebe08485f3457e43085f9bd7cbe549d8d4877164769112f3d64493c9e2dd03c794d99805f45b54d65defad0e6c0aa6ec27d109b82ac971339616757a6ed075e8e4d5bef508298bf188d543bba918b3bae8ad8adc65c57a2744fce8ef5f0ccccd03273a581017c9e22bb99f8a337d754eae9f`,
//   });
//   await page.goto(search.url);
//   try {
//     await page.waitForSelector("#state-webAspects-418255-default-1");
//     const stateElement = await page.$("#state-webAspects-418255-default-1");
//     const stateHTML = await stateElement?.evaluate((element: any) =>
//       element.getAttribute("data-state")
//     );
//     const stateJSON = JSON.parse(stateHTML as string);
//     let i;
//     for(i = 0; stateJSON["aspects"][i].descriptionRs[0].content != "Размер подгузника:"; ++ i);
//     const items = stateJSON["aspects"][i]["variants"];
//     const res = [];
//     for (const item of items) {
//       res.push({
//         size: item.data.searchableText,
//         price: item.data.price,
//         date: new Date(),
//         image: item.data.coverImage,
//       });
//     }
//     await page.close();
//     console.log(res);
//     return res;
//   } catch (err) {
//     fs.writeFileSync("1.html", await page.content());
//     console.log(err);
//     return "Error!!!";
//   }
// }
