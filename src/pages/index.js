import Image from "next/image";
import Link from "next/link";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";
import Hero from "components/hero";

import { getProducts } from "lib/bigcommerce/graphql/operations";
import { getCategories, getHero, getCampaign } from "lib/contentful";

function Home({
  hero,
  categories,
  campaign,
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
        <Link href={campaign.linkUrl} className="z-50">
          <a>
            <div
              className="py-12 flex justify-center text-5xl font-bold"
              style={{
                backgroundColor: campaign.color,
                color: campaign.textColor,
              }}
            >
              <div>
                <div className="transform -rotate-6">
                  <h1 className="text-3xl">{campaign.title}</h1>
                  <h2 className="">{campaign.subTitle}</h2>
                </div>
                <button className="btn btn-black float-right mt-6">
                  {campaign.linkText}
                </button>
              </div>
            </div>
          </a>
        </Link>
        <section className="grid md:grid-cols-2" style={{ height: "50vw" }}>
          {categories.map((category, index) => (
            <Link key={category.id} href={category.slug}>
              <a>
                <div className="relative h-full">
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
        <section className="container mx-auto px-4">
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
        </section>
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
  const campaign = await getCampaign();
  console.log("campaign", campaign);

  return {
    props: {
      featuredProducts,
      bestSellingProducts,
      newestProducts,
      categories,
      hero,
      campaign,
    },
    revalidate: 60,
  };
}

export default Home;
