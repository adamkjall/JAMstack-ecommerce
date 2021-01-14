import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

import { getProducts } from "lib/bigcommerce/operations";

// import useSearch from "@bigcommerce/storefront-data-hooks/products/use-search";
// import getSiteInfo from "@bigcommerce/storefront-data-hooks/api/operations/get-site-info";
// import getAllPages from "@bigcommerce/storefront-data-hooks/api/operations/get-all-pages";
// import { getConfig } from "@bigcommerce/storefront-data-hooks/api";

export default function Products({ products, categories, pages }) {
  const [hej, setHej] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BIGCOMMERCE_STORE_API_URL}/v3/catalog/products`,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Auth-Token": process.env.NEXT_PUBLIC_BIGCOMMERCE_STORE_API_TOKEN,
          },
        }
      );
      const data = await res.json();
      console.log("fetched data", data);
    };

    // fetchData();
  }, []);
  // console.log("products", products[0]);
  // console.log("data", data);
  return (
    <div className="py-8">
      {!products ? (
        <Spinner />
      ) : (
        <div className="mb-8">
          <div className="flex justify-end mb-2">
            <div className="border border-gray-500 text-gray-800 px-2 py-px rounded">
              <label htmlFor="sort">Sort by:</label>
              <select name="sort" id="sort" className="outline-none ml-2">
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="price-asc">Price - ascending</option>
                <option value="price-dsc">Price - descending</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  // const config = getConfig({ locale });
  // console.log("config", config);
  // const { pages } = await getAllPages({ preview });
  // const { categories } = await getSiteInfo({ preview });

  const products = await getProducts("newest", 40);

  return {
    props: {
      products,
      // categories,
      // pages,
    },
  };
}
