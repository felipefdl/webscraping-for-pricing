import { Browser, chromium } from "playwright";

let browser: Browser;

/**
 * Inicia a instancia do browser
 */
async function startBrowser({ showBrowser = false, slowMo = 0 }) {
  if (browser === undefined) {
    browser = await chromium.launch({ headless: !(showBrowser || false), slowMo: slowMo ? slowMo : undefined });
  }

  return browser;
}

/**
 * Fecha a instancia do browser
 */
async function stopBrowser() {
  if (browser) {
    await browser.close();
  }
}

export { startBrowser, stopBrowser };
