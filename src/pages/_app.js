import "../styles/index.css";

import Layout from "components/layout";

import { UIProvider } from "contexts/ui/context";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "lib/apollo/client";

function MyApp({ Component, pageProps }) {
  const apolloCLient = useApollo(pageProps.initialApolloState);
  // console.log("apollo client", apolloCLient);

  return (
    <ApolloProvider client={apolloCLient}>
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </ApolloProvider>
  );
}

export default MyApp;
