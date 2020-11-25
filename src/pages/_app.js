import "../styles/globals.css";
import "../styles/tailwind.css";

import Layout from "components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout pageProps={pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
