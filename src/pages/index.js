import Head from "next/head";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

// import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
// import getProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";

import { getProducts } from "lib/bigcommerce/operations";

// import getSiteInfo from "@bigcommerce/storefront-data-hooks/api/operations/get-site-info";
// import getAllPages from "@bigcommerce/storefront-data-hooks/api/operations/get-all-pages";

function Home({ featuredProducts, bestSellingProducts, newestProducts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-8">
        {!featuredProducts ? (
          <Spinner />
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl">Featured</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </div>
        )}
        {!bestSellingProducts ? (
          <Spinner />
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl">Popular</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {bestSellingProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </div>
        )}
        {!newestProducts ? (
          <Spinner />
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl">New arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {newestProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  const featuredProducts = await getProducts("featured", 4);
  const bestSellingProducts = await getProducts("bestSelling", 4);
  const newestProducts = await getProducts("newest", 4);

  return {
    props: {
      featuredProducts,
      bestSellingProducts,
      newestProducts,
    },
    revalidate: 60 * 60,
  };
}

export default Home;
