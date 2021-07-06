import Papa from "papaparse";
import { startBrowser, stopBrowser } from "./browser";
import { WebsScrappingParams } from "./interfaces";
import ecommerces from "./ecommerce/index";

async function tccWebScrapping(params: WebsScrappingParams) {
  const browserInstance = await startBrowser({ showBrowser: false });

  const fetchTasks = [];

  for (let item of Papa.parse(params.searchFor).data[0] as string[]) {
    item = item.trim();

    for (const ecommerceOption of params.ecommerceOptions) {
      if (!ecommerces[ecommerceOption]) {
        return Promise.reject(`E-commerce option (${ecommerceOption}) is not available`);
      }

      fetchTasks.push(
        ecommerces[ecommerceOption]({ browserInstance, searchFor: item, restrictName: params.restrictName || false })
      );
    }
  }

  const result = await Promise.all(fetchTasks);

  await stopBrowser();

  return result;
}

export default tccWebScrapping;
