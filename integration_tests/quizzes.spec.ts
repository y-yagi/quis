import { test, expect } from "@playwright/test";
import { testServer, fetchTestUser } from "./helper";
import { supabase } from "../lib/supabaseClient";

test.beforeAll(async () => {
  const user = await fetchTestUser();
  const result = await supabase
    .from("quiz_sets")
    .insert({ user_id: user.id, name: "QuizSetForTest" });
  if (result.error) throw result.error;
});

test.afterAll(async () => {
  const user = await fetchTestUser();

  const qResult = await supabase
    .from("quizzes")
    .delete()
    .eq("user_id", user.id);
  if (qResult.error) {
    console.log("delete quiz_sets got error", qResult.error);
    throw qResult.error;
  }

  const sResult = await supabase
    .from("quiz_sets")
    .delete()
    .eq("user_id", user.id);
  if (sResult.error) {
    console.log("delete quiz_sets got error", sResult.error);
    throw sResult.error;
  }
});

test("manage quizzes", async ({ page }) => {
  page.on("console", (msg) => console.log(msg.text()));
  await page.goto(testServer);

  await page.getByText("Edit").click();
  await page.getByText("Add a new Quiz").click();
  await page.getByPlaceholder("Question").fill("This is a question!");
  await page.getByPlaceholder("Answer").fill("This is an answer!");
  await page.getByRole("button").click();
  await expect(page.locator("table")).toContainText("This is a question!");
  await expect(page.locator("table")).toContainText("This is an answer!");

  await page.getByText("Edit").click();
  await page.getByPlaceholder("Question").fill("UpdatedQuestion");
  await page.getByPlaceholder("Answer").fill("UpdatedAnswer");
  await page.getByRole("button").click();
  await expect(page.locator("table")).toContainText("UpdatedQuestion");
  await expect(page.locator("table")).toContainText("UpdatedAnswer");

  page.on("dialog", (dialog) => dialog.accept());
  await page.getByText("Destroy").click();
  await expect(page.locator("table")).not.toContainText("UpdatedQuestion");
});
