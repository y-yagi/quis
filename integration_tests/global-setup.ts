import { chromium, FullConfig } from "@playwright/test";
import { supabase } from "../lib/supabaseClient";
import { expect } from "@playwright/test";
import { testUser } from "./helper";

async function globalSetup(config: FullConfig) {
  const { error } = await supabase.auth.admin.createUser({
    email: testUser.email,
    password: testUser.password,
    data: {},
    email_confirm: true,
  });
  if (
    error &&
    error.message !== "Email address already registered by another user"
  ) {
    throw error;
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:4000/login_for_test");
  await expect(page.locator(".message")).toHaveText("This is a test page");
  await page.locator("#email").fill(testUser.email);
  await page.locator("#password").fill(testUser.password);
  await page.getByRole("button").click();
  await expect(page.locator(".message")).toHaveText("login success");

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "storageState.json" });
  await browser.close();
}

export default globalSetup;
