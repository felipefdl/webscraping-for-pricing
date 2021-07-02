import { startBrowser, stopBrowser } from "../../browser";
import centauro from "../centauro";

describe("Centauro WebScraping", () => {
  test("Get data", async () => {
    const browser = await startBrowser({ showBrowser: false });
    const result = await centauro({
      browserInstance: browser,
      searchFor: "Tênis Nike Revolution 5 - Masculino",
      restrictName: true,
    });

    expect(result.ecommerce).toBe("centauro");
    expect(Object.keys(result.products)).toHaveLength(1);
    expect(typeof result.products[Object.keys(result.products)[0]]).toBe("number");

    await stopBrowser();
  }, 60000);
});
