import tccWebScrapping from "../index";
jest.mock("../browser");
jest.mock("../ecommerce/index", () => {
  return {
    test: ({ searchFor }: any) => ({
      ecommerce: "test",
      products: { [searchFor]: Math.random() * 1000 },
    }),
    test2: ({ searchFor }: any) => ({
      ecommerce: "test2",
      products: { [searchFor]: Math.random() * 1000 },
    }),
  };
});

describe("Index of lib", () => {
  test("Search on one ecommerce with one product", async () => {
    const result = await tccWebScrapping({ ecommerceOptions: ["test"], searchFor: "testArg" });
    expect(result).toHaveLength(1);
    expect(result[0].ecommerce).toBe("test");
    expect(Object.keys(result[0].products)).toHaveLength(1);
    expect(result[0].products?.testArg).toHaveProperty("toPrecision");
  });

  test("Search on two ecommerce with one product", async () => {
    const result = await tccWebScrapping({ ecommerceOptions: ["test", "test2"], searchFor: "testArg" });
    expect(result).toHaveLength(2);
    expect(result[0].ecommerce).toBe("test");
    expect(Object.keys(result[0].products)).toHaveLength(1);
    expect(result[0].products?.testArg).toHaveProperty("toPrecision");
    expect(result[1].ecommerce).toBe("test2");
    expect(Object.keys(result[1].products)).toHaveLength(1);
    expect(result[1].products?.testArg).toHaveProperty("toPrecision");
  });

  test("Search on one ecommerce with multiples product", async () => {
    const result = await tccWebScrapping({ ecommerceOptions: ["test"], searchFor: "testArg;nike;adidas" });
    expect(result).toHaveLength(3);
    expect(result[0].ecommerce).toBe("test");
    expect(Object.keys(result[0].products)).toHaveLength(1);
    expect(result[0].products?.testArg).toHaveProperty("toPrecision");
    expect(result[1].ecommerce).toBe("test");
    expect(Object.keys(result[1].products)).toHaveLength(1);
    expect(result[1].products?.nike).toHaveProperty("toPrecision");
    expect(result[2].ecommerce).toBe("test");
    expect(Object.keys(result[2].products)).toHaveLength(1);
    expect(result[2].products?.adidas).toHaveProperty("toPrecision");
  });

  test("Search on two ecommerce with multiples product", async () => {
    const result = await tccWebScrapping({ ecommerceOptions: ["test", "test2"], searchFor: "testArg;nike;adidas" });
    expect(result).toHaveLength(6);
    expect(result[0].ecommerce).toBe("test");
    expect(Object.keys(result[0].products)).toHaveLength(1);
    expect(result[0].products?.testArg).toHaveProperty("toPrecision");

    expect(result[1].ecommerce).toBe("test2");
    expect(Object.keys(result[1].products)).toHaveLength(1);
    expect(result[1].products?.testArg).toHaveProperty("toPrecision");

    expect(result[2].ecommerce).toBe("test");
    expect(Object.keys(result[2].products)).toHaveLength(1);
    expect(result[2].products?.nike).toHaveProperty("toPrecision");

    expect(result[3].ecommerce).toBe("test2");
    expect(Object.keys(result[3].products)).toHaveLength(1);
    expect(result[3].products?.nike).toHaveProperty("toPrecision");

    expect(result[4].ecommerce).toBe("test");
    expect(Object.keys(result[4].products)).toHaveLength(1);
    expect(result[4].products?.adidas).toHaveProperty("toPrecision");

    expect(result[5].ecommerce).toBe("test2");
    expect(Object.keys(result[5].products)).toHaveLength(1);
    expect(result[5].products?.adidas).toHaveProperty("toPrecision");
  });

  test("E-Commerce web scrapping script not exists", async () => {
    try {
      const result = await tccWebScrapping({ ecommerceOptions: ["noExists"], searchFor: "testArg;nike;adidas" });
      expect(result).toBeNull();
    } catch (error) {
      expect(error).toBe("E-commerce option (noExists) is not available");
    }
  });
});
