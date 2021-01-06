import Head from "next/head";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

// import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
// import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
// import fetchGraphqlApi from "@bigcommerce/storefront-data-hooks/api/utils/fetch-graphql-api";
import { getAllProducts } from "lib/bigcommerce/operations";

// import getSiteInfo from "@bigcommerce/storefront-data-hooks/api/operations/get-site-info";
// import getAllPages from "@bigcommerce/storefront-data-hooks/api/operations/get-all-pages";
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";
// import { useQuery, gql } from "@apollo/client";
// import withApollo from "lib/apollo/withApollo";

// import { gql, useQuery, NetworkStatus } from "@apollo/client";

// import { initializeApollo, addApolloState } from "lib/apollo/apolloClient";

// const QUERY = gql`
//   query paginateProducts($pageSize: Int, $cursor: String) {
//     site {
//       products(first: $pageSize, after: $cursor) {
//         pageInfo {
//           startCursor
//           endCursor
//         }
//         edges {
//           cursor
//           node {
//             entityId
//             name
//             type
//             brand {
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// `;

function Home({ products }) {
  // const { loading, error, data, fetchMore, networkStatus } = useQuery(QUERY, {
  //   variables: {
  //     pageSize: 3,
  //     cursor: "",
  //   },
  //   notifyOnNetworkStatusChange: true,
  // });
  // // console.log("data", data);
  // const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  // const loadMore = () => {
  //   fetchMore({
  //     variables: {
  //       pageSize: 3,
  //       cursor: data?.site?.products.pageInfo.endCursor,
  //     },
  //   });
  // };

  // if (loading && !loadingMorePosts) return <div>Loading..</div>;

  // const products = data?.site?.products?.edges;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-8">
        {!products ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.node.entityId} product={product} />
              // <div key={product.cursor} className="border p-8 m-4">
              //   {product.node.name}
              // </div>
            ))}
          </div>
        )}
        {/* <button onClick={loadMore}>Load more</button> */}
      </main>
    </div>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  const products = await getAllProducts(20);

  return {
    props: {
      products,
    },
    revalidate: 1,
  };
}

export default Home;
