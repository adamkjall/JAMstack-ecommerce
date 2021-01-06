import Layout from "components/layout";

import { UIProvider } from "contexts/ui/context";

// import { ApolloProvider } from "@apollo/client";
// import { useApollo } from "../lib/apollo/apolloClient";

import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  // const apolloClient = useApollo(pageProps);

  return (
    // <ApolloProvider client={apolloClient}>
    <UIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UIProvider>
    // </ApolloProvider>
  );
}

export default MyApp;
