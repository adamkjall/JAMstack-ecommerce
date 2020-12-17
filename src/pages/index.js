import Head from "next/head";
import ProductCard from "components/product/productCard";

import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
import getProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product";
// import getSiteInfo from "@bigcommerce/storefront-data-hooks/api/operations/get-site-info";
// import getAllPages from "@bigcommerce/storefront-data-hooks/api/operations/get-all-pages";

import { useQuery, gql } from "@apollo/client";

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

  // console.log(products[0]);

  return {
    props: {
      products,
    },
    revalidate: 14400,
  };
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

export default function Home({ products }) {
  const { loading, error, data } = useQuery(QUERY);
  console.log("loading", loading);
  console.log("error", error);
  console.log("data", data);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.node.entityId} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
