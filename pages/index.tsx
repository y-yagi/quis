import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import UserContext from "../lib/UserContext";
import Auth from "../components/Auth";
import { AuthSession } from "@supabase/supabase-js";
import Layout from "../components/Layout";
import Head from "next/head";
import Container from "../components/Container";
import Intro from "../components/Intro";
import QuizSets from "../components/QuizSets";
import { Provider } from "react-supabase";

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
        <Layout>
          <Head>
            <title>Quis - login</title>
          </Head>
          <Container>
            <Auth />
          </Container>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Quis</title>
        </Head>
        <Provider value={supabase}>
          <UserContext.Provider value={session.user}>
            <Container>
              <Intro />
              <QuizSets />
            </Container>
          </UserContext.Provider>
        </Provider>
      </Layout>
    </>
  );
}
