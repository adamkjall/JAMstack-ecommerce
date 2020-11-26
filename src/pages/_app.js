import "../styles/globals.css";
import "../styles/tailwind.css";

import Layout from "components/layout";
import { UIProvider } from "contexts/ui/context";

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
