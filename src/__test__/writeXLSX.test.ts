import fs from "fs";
import writeXLSX from "../writeXLSX";
import mockResult from "../mock/mock.result";

describe("WriteXLSX", () => {
  test("Success generate xlsx", () => {
    const writeFileSpy = jest.spyOn(fs, "writeFileSync").mockImplementation((file, data, opt) => {
      expect(file).toBe("./test.xlsx");
      expect(data.toString().includes("<v>test</v>")).toBeTruthy();
      expect(data.toString().includes(`<v>myItem</v></c><c r="B2"><v>18.22</v>`)).toBeTruthy();
      expect((opt as any).encoding).toBe("utf-8");
    });

    writeXLSX([{ ecommerce: "test", products: { myItem: 18.22 } }], "test.xlsx");

    expect(writeFileSpy).toHaveBeenCalledTimes(1);
  });

  test("Success generate xlsx from mock", () => {
    jest.spyOn(fs, "writeFileSync").mockImplementation((file, data, opt) => {
      expect(file).toBe("./test.xlsx");
      expect(data.toString().includes("<v>centauro</v>")).toBeTruthy();
      expect(
        data.toString().includes(`<v>Camisa Polo adidas Masculina Club</v></c><c r="B19"><v>169.99</v>`)
      ).toBeTruthy();
      expect((opt as any).encoding).toBe("utf-8");
    });

    writeXLSX(mockResult, "test.xlsx");
  });
});
