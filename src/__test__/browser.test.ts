import { chromium, LaunchOptions } from "playwright";
import { startBrowser } from "../browser";

describe("Browser Instance", () => {
  test("Start", () => {
    jest.spyOn(chromium, "launch").mockImplementation((args: LaunchOptions) => {
      expect(args.headless).toBeTruthy();
      expect(args.slowMo).toBe(332);
      return Promise.resolve(null as any);
    });
    startBrowser({ showBrowser: false, slowMo: 332 });
  });
});
