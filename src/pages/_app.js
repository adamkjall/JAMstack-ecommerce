import "../styles/index.css";

import Layout from "components/layout";

import { UIProvider } from "contexts/ui/context";

import { ApolloProvider } from "@apollo/client";
import withData from "lib/apollo/client";

function MyApp({ Component, pageProps, apollo }) {
  // const apolloCLient = useApollo(pageProps.initialApolloState);
  // console.log("apollo client", apolloCLient);

  return (
    <ApolloProvider client={apollo}>
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </ApolloProvider>
  );
}

export default withData(MyApp);
