import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

import { getProducts } from "lib/bigcommerce/operations";

export default function Products({ products }) {
  return (
    <div className="h-100 flex mx-auto">
      <h1>PRODUCTS PAGE</h1>
    </div>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  const products = await getProducts("newest", 20);

  return {
    props: {
      products,
    },
    revalidate: 60 * 60,
  };
}
