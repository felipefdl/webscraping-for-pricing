import { fetchParams, fetchProducts, fetchResult } from "../interfaces";

async function netshoes(fetchParams: fetchParams): Promise<fetchResult> {
  const browser = await fetchParams.browserInstance.newContext();
  const page = await browser.newPage();
  await page.goto(`https://www.netshoes.com.br/busca?nsCat=Natural&q=${encodeURIComponent(fetchParams.searchFor)}`);
  await page.waitForLoadState("domcontentloaded");

  const products = await page.$$(".item-list>.wrapper>.item-card");

  const productsResult: fetchProducts = {};

  for (const item of products) {
    await item.scrollIntoViewIfNeeded();
    await item.waitForSelector(".price__list,.price__list--seller", { timeout: 1000 }).catch(() => null);

    const nameEL = await item.$(`.item-card__description__product-name`);
    const priceEL = await item.$(".price__list,.price__list--seller");

    if (nameEL && priceEL) {
      const price = await priceEL.$eval("div", (el) => el.getAttribute("data-final-price"));
      const name = await nameEL.$eval("span", (el) => el.textContent);
      if (fetchParams.restrictName && fetchParams.searchFor.toLowerCase().trim() !== name.toLowerCase().trim()) {
        continue;
      }

      productsResult[name] = Number(price) / 100;
    }
  }

  await browser.close();

  return { ecommerce: "netshoes", products: productsResult };
}

export default netshoes;
