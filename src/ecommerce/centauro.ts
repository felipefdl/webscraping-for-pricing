import { fetchParams, fetchProducts, fetchResult } from "../interfaces";
const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36";

async function centauro(fetchParams: fetchParams): Promise<fetchResult> {
  const browser = await fetchParams.browserInstance.newContext({ userAgent });

  const page = await browser.newPage();
  await page.goto(`https://www.centauro.com.br/busca?q=${encodeURIComponent(fetchParams.searchFor)}`);
  await page.waitForSelector(".product-card");

  const productsPreLoad = await page.$$("._h898sf1>div");

  for (const item of productsPreLoad) {
    await item.scrollIntoViewIfNeeded().catch(() => null);
  }
  await page.waitForLoadState("networkidle");

  const products = await page.$$("._h898sf1>.product-card");

  const productsResult: fetchProducts = {};

  for (const item of products) {
    const nameEL = await item.$(`._xe1nr1`);
    const priceEL = await item.$("._9pmwio");
    if (!nameEL || !priceEL) continue;

    const name = await nameEL.textContent();
    let priceString = await priceEL.textContent();
    priceString = priceString.replace(/R\$|,/gi, "");
    const price = Number(priceString);

    if (fetchParams.restrictName && fetchParams.searchFor.toLowerCase().trim() !== name.toLowerCase().trim()) {
      continue;
    }

    productsResult[name] = Number(price) / 100;
  }

  await browser.close();

  return { ecommerce: "centauro", products: productsResult };
}

export default centauro;
