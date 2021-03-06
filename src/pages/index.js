import Link from "next/link";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";
import Hero from "components/hero";
import Category from "components/category";

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
  console.log("hero", hero);
  return (
    <div>
      <main className="">
        <Link href={hero.linkUrl}>
          <a>
            <Hero
              title={hero.title}
              images={hero.backgroundImages}
              buttonText={hero.linkText}
            />
          </a>
        </Link>
        <Link href={campaign.linkUrl}>
          <a>
            <div
              className="py-12 px-6 flex justify-center text-5xl font-bold -m-1"
              style={{
                backgroundColor: campaign.color,
                color: campaign.textColor,
              }}
            >
              <div>
                <div className="transform -rotate-6 font-knewave">
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
        <section className="grid md:grid-cols-2">
          {categories.map((category, index) => (
            <Link key={category.id} href={category.slug}>
              <a>
                <Category
                  categoryName={category.title}
                  imageUrl={category.backgroundImage.fields.file.url}
                  alignButtonX={index === 0 ? "right" : "left"}
                />
              </a>
            </Link>
          ))}
        </section>

        <section className="grid grid-cols-1">
          {!featuredProducts ? (
            <Spinner />
          ) : (
            <div className="pt-12" style={{ backgroundColor: "#0C7AA4" }}>
              <div className="container mx-auto ">
                <h2 className="text-4xl font-bold text-white mb-8 ml-8">
                  Featured
                </h2>
              </div>
              <div style={{ backgroundColor: "#074962" }}>
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 py-20">
                  {featuredProducts.map(({ node: product }) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
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
            </div>
          )}
          {!bestSellingProducts ? (
            <Spinner />
          ) : (
            <div className="pt-12" style={{ backgroundColor: "#1A1A1A" }}>
              <div className="container mx-auto ">
                <h2 className="text-4xl font-bold text-white mb-8 ml-8">
                  Popular
                </h2>
              </div>
              <div style={{ backgroundColor: "#101010" }}>
                <div className=" container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 py-20">
                  {bestSellingProducts.map(({ node: product }) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
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
            </div>
          )}
          {!newestProducts ? (
            <Spinner />
          ) : (
            <div className="pt-12" style={{ backgroundColor: "#F05A2B" }}>
              <div className="container mx-auto ">
                <h2 className="text-4xl font-bold mb-8 ml-8">New arrivals</h2>
              </div>
              <div style={{ backgroundColor: "#F7AC95" }}>
                <div className=" container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 py-20">
                  {newestProducts.map(({ node: product }) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
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
