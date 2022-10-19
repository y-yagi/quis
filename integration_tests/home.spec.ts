import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  page.on("console", (msg) => console.log(msg.text()));

  await page.goto("http://localhost:3000");
  const title = page.locator("h1");
  await expect(title).toHaveText("Choose Quiz");
});
