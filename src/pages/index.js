import Head from "next/head";
import ProductCard from "components/product/productCard";

import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
// import getSiteInfo from "@bigcommerce/storefront-data-hooks/api/operations/get-site-info";
// import getAllPages from "@bigcommerce/storefront-data-hooks/api/operations/get-all-pages";
import Layout from "components/layout";

export async function getStaticProps({ locale, preview = false }) {
  const config = getConfig({ locale });

  const { products } = await getAllProducts({
    variables: { field: "products", first: 20 },
    config,
    preview,
  });

  return {
    props: {
      products,
    },
    revalidate: 14400,
  };
}

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-5xl mx-auto my-8">
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard kay={product.node.entityId} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

Home.Layout = Layout;
