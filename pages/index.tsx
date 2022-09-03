import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Dashboard from "../components/Dashboard";
import { AuthSession } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) setSession(session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {!session ? <Auth /> : <Dashboard />}
    </div>
  );
}
