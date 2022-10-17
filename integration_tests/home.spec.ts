import { test, expect } from "@playwright/test";
import { supabase } from "../lib/supabaseClient";

test.beforeEach(async ({ page }) => {
  const email = "example@example.com";
  const password = "example-password";
  const { error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    data: {},
    email_confirm: true,
  });
  // TODO: Ignore "AuthApiError: Email address already registered by another use"
  // if (error) throw error;

  await page.goto("http://localhost:3000/login_for_test");
  await expect(page.locator(".message")).toHaveText("This is a test page");

  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button").click();
  await expect(page.locator(".message")).toHaveText("login success");
});

test("basic test", async ({ page }) => {
  page.on("console", (msg) => console.log(msg.text()));

  await page.goto("http://localhost:3000");
  const title = page.locator("h1");
  await expect(title).toHaveText("Choose Quiz");
});
