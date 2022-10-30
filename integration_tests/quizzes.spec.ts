import { test, expect } from "@playwright/test";
import { testServer } from "./helper";
import { supabase } from "../lib/supabaseClient";

test.beforeAll(async () => {
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  if (error) throw error;

  const result = await supabase
    .from("quiz_sets")
    .insert({ user_id: users[0].id, name: "QuizSetForTest" });
  if (result.error) throw error;
});

test.afterAll(async () => {
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  if (error) {
    console.log("get user got error", error);
    throw error;
  }

  const qResult = await supabase
    .from("quizzes")
    .delete()
    .eq("user_id", users[0].id);
  if (qResult.error) {
    console.log("delete quiz_sets got error", qResult.error);
    throw qResult.error;
  }

  const sResult = await supabase
    .from("quiz_sets")
    .delete()
    .eq("user_id", users[0].id);
  if (sResult.error) {
    console.log("delete quiz_sets got error", sResult.error);
    throw sResult.error;
  }
});

test("create quizzes", async ({ page }) => {
  page.on("console", (msg) => console.log(msg.text()));
  await page.goto(testServer);

  await page.getByText("Edit").click();
  await page.getByText("Add a new Quiz").click();
  await page.getByPlaceholder("Question").fill("This is a question!");
  await page.getByPlaceholder("Answer").fill("This is an answer!");
  await page.getByRole("button").click();
  await expect(page.locator("table")).toContainText("This is a question!");
  await expect(page.locator("table")).toContainText("This is an answer!");
});
