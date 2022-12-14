import { test, expect } from "@playwright/test";
import { testServer } from "./helper";

test("basic test", async ({ page }) => {
  page.on("console", (msg) => console.log(msg.text()));

  await page.goto(testServer);
  const title = page.locator("h1");
  await expect(title).toHaveText("Choose Quiz");
});
