import prompts from "prompts";
import i from "../index";
import w from "../writeXLSX";
jest.mock("../index");
jest.mock("../writeXLSX");

prompts.inject([["myEcommerce", "mySecondsEcommerce"], "product1;product2", "xlsx", "testFile"]);

describe("CLI", () => {
  test("Test parameters", () => {
    //@ts-ignore
    i.mockImplementationOnce(({ ecommerceOptions, searchFor }) => {
      expect(ecommerceOptions).toMatchObject(["myEcommerce", "mySecondsEcommerce"]);
      expect(searchFor).toEqual("product1;product2");
    });
    //@ts-expect-error
    w.mockImplementationOnce((...args) => {
      expect(args[1]).toBe("testFile.xlsx");
    });
    require("../cli");
    jest.resetModules();
  });
});
