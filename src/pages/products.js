import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

import { getProducts } from "lib/bigcommerce/graphql/operations";
import { getCategories, getBrands } from "lib/bigcommerce/rest";

export default function Products({ products, categories, brands }) {
  const [filterOptions, setFilterOptions] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/bigcommerce/catalog/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterOptions),
      });
      const data = await res.json();
      setFilteredProducts(data);
      setLoading(false);
    };

    if (filterOptions) {
      fetchData();
    }
  }, [filterOptions]);

  console.log("options", filterOptions);
  console.log("filteredProducts", filteredProducts);
  console.log("router", router.query);
  return (
    <div className="flex py-8">
      <div className="flex-1 mr-10">
        <div className="categories">
          <h3 className="text-xl font-bold mb-2">Categories</h3>
          {!categories ? (
            <Spinner />
          ) : (
            <ul>
              {categories
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((c) => (
                  <li
                    className={`${
                      c.id === filterOptions?.categories ? "font-bold" : ""
                    } cursor-pointer`}
                    key={c.id}
                    onClick={() =>
                      setFilterOptions((opt) => ({ ...opt, categoryId: c.id }))
                    }
                  >
                    {c.name}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="brands mt-8">
          <h3 className="text-xl font-bold mb-2">Brands</h3>
          {!brands ? (
            <Spinner />
          ) : (
            <ul>
              {brands.map((brand) => (
                <li
                  className={`${
                    brand.id === filterOptions?.brand ? "font-bold" : ""
                  } cursor-pointer`}
                  key={brand.id}
                  onClick={() =>
                    setFilterOptions((opt) => ({ ...opt, brandId: brand.id }))
                  }
                >
                  {brand.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {!products ? (
        <Spinner />
      ) : (
        <div className="mb-8">
          <div className="flex justify-end mb-2">
            <div className="border border-gray-500 text-gray-800 px-2 py-px rounded">
              <label htmlFor="sort">Sort by:</label>
              <select
                name="sort"
                id="sort"
                className="outline-none ml-2 bg-transparent"
                onChange={(e) =>
                  setFilterOptions((opt) => ({ ...opt, ...e.target.value }))
                }
              >
                <option defaultValue value="id">
                  Newest
                </option>
                <option value="total_sold">Popular</option>
                <option value="price">Price - ascending</option>
                <option value="price">Price - descending</option>
              </select>
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  const products = await getProducts("newest", 40);
  const categories = await getCategories();
  const brands = await getBrands();

  return {
    props: {
      products,
      categories,
      brands,
    },
  };
}
