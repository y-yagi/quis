import { chromium, FullConfig } from "@playwright/test";
import { supabase } from "../lib/supabaseClient";
import { expect } from "@playwright/test";

async function globalSetup(config: FullConfig) {
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

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/login_for_test");
  await expect(page.locator(".message")).toHaveText("This is a test page");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button").click();
  await expect(page.locator(".message")).toHaveText("login success");

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "storageState.json" });
  await browser.close();
}

export default globalSetup;
