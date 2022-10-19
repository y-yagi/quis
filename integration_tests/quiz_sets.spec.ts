import { test, expect } from "@playwright/test";

test("create a new quiz", async ({ page }) => {
  page.on("console", (msg) => console.log(msg.text()));

  await page.goto("http://localhost:4000");
  await page.getByText("Create a new Quiz Sets").click();
  await page.getByPlaceholder("name").fill("MyNewQuiz");
  await page.getByRole("button").click();
  await expect(page.locator("table")).toContainText("MyNewQuiz");
});
