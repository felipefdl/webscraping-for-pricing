import { startBrowser, stopBrowser } from "../../browser";
import dafiti from "../dafiti";

describe("Dafiti WebScraping", () => {
  test("Get data", async () => {
    const browser = await startBrowser({ showBrowser: false });
    const result = await dafiti({
      browserInstance: browser,
      searchFor: "Tênis Nike Revolution 5",
    });

    expect(result.ecommerce).toBe("dafiti");
    expect(Object.keys(result.products).length > 0).toBeTruthy();
    expect(typeof result.products[Object.keys(result.products)[0]]).toBe("number");

    await stopBrowser();
  }, 60000);
});
