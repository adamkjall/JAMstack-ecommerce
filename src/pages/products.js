import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

import { getProducts } from "lib/bigcommerce/graphql/operations";
import { getCategories, getBrands } from "lib/bigcommerce/rest";

import useSearch from "hooks/useSearch";

export default function Products({ products, categories, brands }) {
  const [filterOptions, setFilterOptions] = useState();
  const router = useRouter();
  const { result, error, loading } = useSearch(router.query);

  useEffect(() => {
    if (!filterOptions) {
      setFilterOptions(router.query);
    } else {
      const query = Object.entries(filterOptions).reduce(
        (acc, [key, value]) => {
          if (!value) return { ...acc };
          return { ...acc, [key]: value };
        },
        {}
      );
      router.push(
        {
          query,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [filterOptions]);

  console.log("options", filterOptions);
  console.log("router", router);
  // console.log("brands", brands);

  function handleCheck(e, property) {
    const clickedId = e.target.value;
    const isChecked = filterOptions?.[property]?.includes(clickedId);
    let ids;
    if (isChecked) {
      ids = filterOptions[property]
        .split(",")
        .filter((id) => id !== clickedId)
        .join(",");
    } else {
      ids = filterOptions?.[property]
        ? `${filterOptions[property]},${clickedId}`
        : clickedId + "";
    }
    setFilterOptions((opt) => ({ ...opt, [property]: ids }));
  }

  return (
    <div className="max-w-6xl mx-auto flex py-8">
      <div className="mr-10">
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
                      c.id === filterOptions?.categoryId ? "font-bold" : ""
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
            <div>
              {brands.map((brand) => (
                <div key={brand.id}>
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id={brand.id}
                    name={brand.name}
                    value={brand.id}
                    onChange={(e) => handleCheck(e, "brandId")}
                  />
                  <label className="ml-2" htmlFor={brand.id}>
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {!products ? (
        <Spinner />
      ) : (
        <div className="mb-8 flex-1">
          <div className="flex justify-end mb-2">
            <div className="border border-gray-500 text-gray-800 px-2 py-px rounded">
              <label htmlFor="sort">Sort by:</label>
              <select
                name="sort"
                id="sort"
                className="outline-none ml-2 bg-transparent"
                onChange={(e) =>
                  setFilterOptions((opt) => ({
                    ...opt,
                    sortBy: e.target.value,
                  }))
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
              {result
                ? result.map((product) => (
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
