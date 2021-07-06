import { writeFileSync } from "fs";
import xlsx from "node-xlsx";
import { fetchResult } from "./interfaces";

/**
 * Gerador de Planilha Excel com Produtos e Preços
 */
function writeXLSX(scrappingData: fetchResult[], fileName: string) {
  const data: any[][] = [[]];

  let lastIndex = 0;
  for (const [index, item] of scrappingData.entries()) {
    const productIndex = lastIndex + index;
    const priceIndex = productIndex + 1;
    lastIndex += 2;

    data[0][productIndex] = item.ecommerce;
    data[0][priceIndex] = "price";
    for (const [productI, product] of Object.keys(item.products).entries()) {
      if (!data[productI + 1]) {
        data[productI + 1] = [];
      }

      data[productI + 1][productIndex] = product;

      data[productI + 1][productIndex + 1] = item.products[product];
    }
  }

  const buffer = xlsx.build([{ name: fileName, data: data }]);

  //@ts-ignore
  writeFileSync(`./${fileName}`, buffer, { encoding: "utf-8" });
  console.log("Arquivo salvo em", `./${fileName}`);
}

export default writeXLSX;
