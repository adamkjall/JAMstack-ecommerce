import Head from "next/head";
import ProductCard from "components/product/productCard";

import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
import getProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product";
// import getSiteInfo from "@bigcommerce/storefront-data-hooks/api/operations/get-site-info";
// import getAllPages from "@bigcommerce/storefront-data-hooks/api/operations/get-all-pages";
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";
// import { useQuery, gql } from "@apollo/client";
// import withApollo from "lib/apollo/withApollo";

import { gql } from "@apollo/client";

import { initializeApollo, addApolloState } from "lib/apollo/apolloClient";

export async function getStaticProps({ locale, preview = false }) {
  const config = getConfig({ locale });

  const { products } = await getAllProducts({
    variables: { field: "products", first: 50 },
    config,
    preview,
  });

  const { product } = await getProduct({
    variables: { slug: "smith-journal-13" },
    config,
    preview,
  });

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 14400,
  });
}

const QUERY = gql`
  query paginateProducts($pageSize: Int = 20, $cursor: String) {
    site {
      products(first: $pageSize, after: $cursor) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            entityId
            name
            type
            brand {
              name
            }
          }
        }
      }
    }
  }
`;

function Home(props) {
  console.log("rest", props);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {props?.products?.map((product) => (
            <ProductCard key={product.node.entityId} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
