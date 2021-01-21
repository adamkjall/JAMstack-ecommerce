import Image from "next/image";
import Link from "next/link";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

import { getProducts } from "lib/bigcommerce/graphql/operations";
import { getCategories } from "lib/contentful";

function Home({
  categories,
  featuredProducts,
  bestSellingProducts,
  newestProducts,
}) {
  return (
    <div>
      <main className="my-8">
        <section className="grid md:grid-cols-2" style={{ height: "50vw" }}>
          {categories.map((category, index) => (
            <Link href={category.slug}>
              <a className="h-full">
                <div key={category.id} className="relative h-full">
                  <button
                    className={`${
                      index == 0 ? "right-0" : ""
                    } btn btn-black z-10 absolute bottom-1/4 px-10 text-xl mx-10 min-w-min w-52`}
                  >
                    {category.title}
                  </button>
                  <Image
                    src={"https:" + category.backgroundImage.fields.file.url}
                    objectFit="cover"
                    layout="fill"
                    alt={`Category ${category.title}`}
                  />
                </div>
              </a>
            </Link>
          ))}
        </section>
        {!featuredProducts ? (
          <Spinner />
        ) : (
          <div className="my-8">
            <h2 className="text-2xl">Featured</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.map(({ node: product }) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  brand={product.brand?.name}
                  retailPrice={product.prices.price.value}
                  originalPrice={product.prices.basePrice.value}
                  currencyCode={product.prices.price.currencyCode}
                  path={product.path}
                  imgUrl={product.defaultImage.url320wide}
                />
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
              {bestSellingProducts.map(({ node: product }) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  brand={product.brand?.name}
                  retailPrice={product.prices.price.value}
                  originalPrice={product.prices.basePrice.value}
                  currencyCode={product.prices.price.currencyCode}
                  path={product.path}
                  imgUrl={product.defaultImage.url320wide}
                />
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
              {newestProducts.map(({ node: product }) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  brand={product.brand?.name}
                  retailPrice={product.prices.price.value}
                  originalPrice={product.prices.basePrice.value}
                  currencyCode={product.prices.price.currencyCode}
                  path={product.path}
                  imgUrl={product.defaultImage.url320wide}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  // Product data from Bigcommerce
  const featuredProducts = await getProducts("featured", 4);
  const bestSellingProducts = await getProducts("bestSelling", 4);
  const newestProducts = await getProducts("newest", 8);

  // Content data from Contentful
  const categories = await getCategories();
  console.log(categories[0].backgroundImage.fields.file.details);
  return {
    props: {
      featuredProducts,
      bestSellingProducts,
      newestProducts,
      categories,
    },
    revalidate: 60,
  };
}

export default Home;
