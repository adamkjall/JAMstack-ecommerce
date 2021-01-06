import Head from "next/head";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

import { getAllProducts } from "lib/bigcommerce/operations";

// import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
// import getSiteInfo from "@bigcommerce/storefront-data-hooks/api/operations/get-site-info";
// import getAllPages from "@bigcommerce/storefront-data-hooks/api/operations/get-all-pages";

function Home({ products }) {
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
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
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
