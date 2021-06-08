/* eslint-disable no-unused-vars */
import { fetchParams, fetchResult } from "../interfaces";
import centauro from "./centauro";
import dafiti from "./dafiti";
import netshoes from "./netshoes";

interface ecommeceFunction {
  [index: string]: (fetchParams: fetchParams) => Promise<fetchResult>;
}

const scrapingScripts: ecommeceFunction = {
  centauro,
  netshoes,
  dafiti,
};

export default scrapingScripts;
