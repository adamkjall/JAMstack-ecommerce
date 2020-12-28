import withApollo from "next-with-apollo";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:8010/proxy"
      : process.env.NEXT_PUBLIC_BIGCOMMERCE_STOREFRONT_API_URL,
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_BIGCOMMERCE_STOREFRONT_API_TOKEN}`,
  },
});

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
