import { useRouter } from "next/router";

import {
  getProductBySlug,
  getAllProductPaths,
} from "lib/bigcommerce/graphql/operations";

import ProductView from "components/product/productView";

export default function Slug({ product }) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading product...</h1>
  ) : (
    <ProductView product={product} />
  );
}

export async function getStaticProps({ params, locale, preview }) {
  const product = await getProductBySlug(params.slug);

  return {
    props: { product },
    revalidate: 200,
  };
}

export async function getStaticPaths({ locales }) {
  const products = await getAllProductPaths();
  const paths = products.map((product) => `/product${product.node.path}`);

  return {
    paths: paths,
    fallback: false,
  };
}
