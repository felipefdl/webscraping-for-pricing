import { startBrowser, stopBrowser } from "../../browser";
import netshoes from "../netshoes";

describe("Netshoes WebScraping", () => {
  test("Get data", async () => {
    const browser = await startBrowser({ showBrowser: false });
    const result = await netshoes({
      browserInstance: browser,
      searchFor: "Tênis Nike Revolution 5",
    });

    expect(result.ecommerce).toBe("netshoes");
    expect(Object.keys(result.products).length > 0).toBeTruthy();
    expect(typeof result.products[Object.keys(result.products)[0]]).toBe("number");

    await stopBrowser();
  }, 60000);
});
