import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

import { getProducts } from "lib/bigcommerce/graphql/operations";
import { getCategories } from "lib/bigcommerce/rest";

// import useSearch from "@bigcommerce/storefront-data-hooks/products/use-search";
// import getSiteInfo from "@bigcommerce/storefront-data-hooks/api/operations/get-site-info";
// import getAllPages from "@bigcommerce/storefront-data-hooks/api/operations/get-all-pages";
// import { getConfig } from "@bigcommerce/storefront-data-hooks/api";

export default function Products({ products, categories, pages }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/bigcommerce/catalog/products/category?id=${selectedCategoryId}`
      );
      const data = await res.json();
      setFilteredProducts(data);
    };

    if (typeof selectedCategoryId === "number") {
      fetchData();
    }
  }, [selectedCategoryId]);
  // console.log("products", products[0]);
  console.log("data", filteredProducts);
  return (
    <div className="flex py-8">
      <div className="mr-10">
        <h3 className="text-xl font-bold mb-2">Categories</h3>
        {!categories ? (
          <Spinner />
        ) : (
          <ul>
            {categories.map((c) => (
              <li
                className={`${
                  c.id === selectedCategoryId ? "font-bold" : ""
                } cursor-pointer`}
                key={c.id}
                onClick={() => setSelectedCategoryId(c.id)}
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}
      </div>
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
            {filteredProducts
              ? filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    brand={product.brand}
                    retailPrice={product.calculated_price}
                    originalPrice={product.price}
                    currencyCode={"USD"}
                    path={product.custom_url.url}
                    imgUrl={product.imgUrl}
                  />
                ))
              : products.map(({ node: product }) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    brand={product.brand?.name}
                    retailPrice={product.prices.price.value}
                    originalPrice={product.prices.basePrice.value}
                    currencyCode={product.prices.price.currencyCode}
                    path={product.path}
                    imgUrl={product.defaultImage.url320wide}
                    altText={product.defaultImage.altText}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  const products = await getProducts("newest", 40);

  const categories = await getCategories();

  return {
    props: {
      products,
      categories,
      // pages,
    },
  };
}
