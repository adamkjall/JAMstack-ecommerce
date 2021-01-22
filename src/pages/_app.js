import Head from "next/head";

import Layout from "components/layout";

import { UIProvider } from "contexts/ui";
import { CookiesProvider } from "react-cookie";

import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>JAMcom clothes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CookiesProvider>
        <UIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UIProvider>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
