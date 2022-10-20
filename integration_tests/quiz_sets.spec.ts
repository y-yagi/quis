import { test, expect } from "@playwright/test";
import { testServer } from "./helper";

test("create a new quiz", async ({ page }) => {
  page.on("console", (msg) => console.log(msg.text()));

  await page.goto(testServer);
  await page.getByText("Create a new Quiz Sets").click();
  await page.getByPlaceholder("name").fill("MyNewQuiz");
  await page.getByRole("button").click();
  await expect(page.locator("table")).toContainText("MyNewQuiz");
});
