import Layout from "components/layout";

import { UIProvider } from "contexts/ui/context";

import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <UIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UIProvider>
  );
}

export default MyApp;
