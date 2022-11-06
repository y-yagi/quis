import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

export const testUser = {
  email: "example@example.com",
  password: "example-password",
};
export const testServer: string = "localhost:4000";
export async function fetchTestUser(): Promise<User> {
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  if (error) {
    console.log("get user got error", error);
    throw error;
  }

  const user = users.find((user) => user.email === testUser.email);
  if (!user) throw "couldn't find test user";

  return user;
}
