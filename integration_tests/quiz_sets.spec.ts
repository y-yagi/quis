import { test, expect } from "@playwright/test";
import { testServer } from "./helper";

test("manage quiz set", async ({ page }) => {
  page.on("console", (msg) => console.log(msg.text()));
  await page.goto(testServer);

  await page.getByText("Create a new Quiz Sets").click();
  await page.getByPlaceholder("name").fill("MyNewQuizSet");
  await page.getByRole("button").click();
  await expect(page.locator("table")).toContainText("MyNewQuizSet");

  await page.getByText("Edit").click();
  await page.getByPlaceholder("name").fill("MyUpdatedQuizSet");
  await page.getByRole("button").click();
  await expect(page.locator("table")).toContainText("MyUpdatedQuizSet");

  page.on("dialog", (dialog) => dialog.accept());
  await page.getByText("Destroy").click();
  await expect(page.locator("table")).not.toContainText("MyUpdatedQuizSet");
});
