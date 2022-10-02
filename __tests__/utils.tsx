import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const client: SupabaseClient = createClient(
  "http://localhost",
  "some.fake.key"
);
