import { supabase } from "../lib/supabaseClient";

export const testServer: string = "localhost:4000";
export async function fetchTestUser() {
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  if (error) {
    console.log("get user got error", error);
    throw error;
  }

  return users[0];
}
