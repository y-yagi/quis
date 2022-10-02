import { createClient, SupabaseClient } from "@supabase/supabase-js";
import React from "react";
import { Provider } from "react-supabase";

export const client: SupabaseClient = createClient(
  "http://localhost",
  "some.fake.key"
);

export const ProviderWrapper: React.FC<{ children: any }> = ({ children }) => (
  <Provider value={client}>{children}</Provider>
);
