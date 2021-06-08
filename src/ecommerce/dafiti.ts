import { fetchParams, fetchProducts, fetchResult } from "../interfaces";

async function dafiti(fetchParams: fetchParams): Promise<fetchResult> {
  const browser = await fetchParams.browserInstance.newContext();
  const page = await browser.newPage();
  await page.goto(`https://www.dafiti.com.br/catalog/?q=${encodeURIComponent(fetchParams.searchFor)}`);
  await page.waitForLoadState("domcontentloaded");

  const products = await page.$$(".main-list>.product-box");

  const productsResult: fetchProducts = {};

  for (const item of products) {
    const nameEL = await item.$(`.product-box-title`);
    const priceTO = await item.$(".product-box-price-to");
    const priceFrom = await item.$(".product-box-price-from");
    const priceEL = priceTO || priceFrom;
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

  return { ecommerce: "dafiti", products: productsResult };
}

export default dafiti;
