import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AuthSession } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import Layout from "../components/Layout";
import Head from "next/head";
import Container from "../components/Container";
import Auth from "../components/Auth";
import { Provider } from "react-supabase";
import UserContext from "../lib/UserContext";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setSession(data.session);
      setFetching(false);

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    })();
  }, []);

  if (
    process.env.NODE_ENV === "development" &&
    router.pathname === "/login_for_test"
  ) {
    return <Component />;
  }

  if (fetching) return <div>Loading...</div>;

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
            <Component {...pageProps} />
          </UserContext.Provider>
        </Provider>
      </Layout>
    </>
  );
}
