import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import { AuthSession } from "@supabase/supabase-js";
import Layout from "../components/Layout";
import Head from "next/head";
import Container from "../components/Container";
import Intro from "../components/Intro";

export default function Index() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) setSession(session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) {
    return (
      <>
        <Auth />
      </>
    );
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Quis</title>
        </Head>
        <Container>
          <Intro />
        </Container>
      </Layout>
    </>
  );
}
