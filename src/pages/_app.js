import Layout from "components/layout";

import { UIProvider } from "contexts/ui/context";
import { CookiesProvider } from "react-cookie";

import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </CookiesProvider>
  );
}

export default MyApp;
