import { Browser } from "playwright";

interface fetchParams {
  browserInstance: Browser;
  searchFor: string;
  restrictName?: boolean;
}

interface fetchResult {
  ecommerce: string;
  products: fetchProducts;
}

interface fetchProducts {
  [product: string]: number;
}

interface WebsScrappingParams {
  ecommerceOptions: string[];
  searchFor: string;
}

export { fetchParams, fetchResult, fetchProducts, WebsScrappingParams };
