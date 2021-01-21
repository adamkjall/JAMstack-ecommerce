import Image from "next/image";
import Link from "next/link";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";
import Hero from "components/hero";

import { getProducts } from "lib/bigcommerce/graphql/operations";
import { getCategories, getHero } from "lib/contentful";

function Home({
  hero,
  categories,
  featuredProducts,
  bestSellingProducts,
  newestProducts,
}) {
  return (
    <div>
      <main className="mb-8">
        <Link href={hero.linkUrl}>
          <a>
            <Hero
              title={hero.title}
              images={hero.backgroundImages}
              buttonText={hero.linkText}
            />
          </a>
        </Link>
        <section className="grid md:grid-cols-2" style={{ height: "50vw" }}>
          {categories.map((category, index) => (
            <Link href={category.slug}>
              <a>
                <div key={category.id} className="relative h-full">
                  <button
                    className={`${
                      index == 0 ? "right-0" : ""
                    } btn btn-black z-10 absolute bottom-1/4 px-10 text-2xl mx-10 min-w-min w-52`}
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
  const hero = await getHero();
  console.log("hero", hero);
  // console.log();
  // console.log(categories[0].backgroundImage.fields.file.details);
  return {
    props: {
      featuredProducts,
      bestSellingProducts,
      newestProducts,
      categories,
      hero,
    },
    revalidate: 60,
  };
}

export default Home;
