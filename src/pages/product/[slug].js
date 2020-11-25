import { useRouter } from "next/router";

import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product";

import ProductView from "components/product/productView";
import getAllProductPaths from "@bigcommerce/storefront-data-hooks/api/operations/get-all-product-paths";

export async function getStaticProps({ params, locale, preview }) {
  const config = getConfig({ locale });

  const { product } = await getProduct({
    variables: { slug: params.slug },
    config,
    preview,
  });

  return {
    props: { product },
    revalidate: 200,
  };
}

export async function getStaticPaths({ locales }) {
  const { products } = await getAllProductPaths();
  const paths = products.map((product) => `/product${product.node.path}`);

  return {
    paths: paths,
    fallback: false,
  };
}

export default function Slug({ product }) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading product...</h1>
  ) : (
    <ProductView product={product} />
  );
}
