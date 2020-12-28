import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri:
        // !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        //   ? "http://localhost:8010/proxy"
        //   :

        process.env.NEXT_PUBLIC_BIGCOMMERCE_STOREFRONT_API_URL,
      // method: "POST",
      // credentials: "same-origin",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BIGCOMMERCE_STOREFRONT_API_TOKEN}`,
      },
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(inistialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  // console.log(_apolloClient);
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (inistialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...inistialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
