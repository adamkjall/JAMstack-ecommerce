import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

import { getProducts } from "lib/bigcommerce/graphql/operations";

function Home({ featuredProducts, bestSellingProducts, newestProducts }) {
  return (
    <div>
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
  const newestProducts = await getProducts("newest", 8);

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
