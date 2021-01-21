import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

import { getProducts } from "lib/bigcommerce/graphql/operations";
import { getCategories, getBrands } from "lib/bigcommerce/rest";

import useSearch from "hooks/useSearch";

import { shallowEqual } from "utils";

export default function Products({ products, categories, brands }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState();
  const { result, error, loading } = useSearch(searchQuery);

  // save the query to state
  useEffect(() => {
    const noQuery = JSON.stringify(router.query) === "{}";
    if (noQuery) {
      setSearchQuery(null);
    } else if (!searchQuery) {
      setSearchQuery(router.query);
    } else {
      const hasQueryChanged = !shallowEqual(router.query, searchQuery);
      // only update state if query differs from the one in state
      if (hasQueryChanged) {
        setSearchQuery(router.query);
      }
    }
  }, [router.query]);

  // updates to url according to the state
  useEffect(() => {
    if (!searchQuery) {
      return;
    } else {
      // create a query with only the options that have a value
      const query = Object.entries(searchQuery).reduce((acc, [key, value]) => {
        if (!value) return { ...acc };
        return { ...acc, [key]: value };
      }, {});
      router.push({
        query,
      });
    }
  }, [searchQuery]);

  // console.log("options", searchQuery);
  // console.log("query", router.query);

  // handles which checkboxes are set and stores it in state
  function handleCheck(e, property) {
    const clickedId = e.target.value;
    const isChecked = searchQuery?.[property]?.includes(clickedId);
    let ids;
    if (isChecked) {
      ids = searchQuery[property]
        .split(",")
        .filter((id) => id !== clickedId)
        .join(",");
    } else {
      ids = searchQuery?.[property]
        ? `${searchQuery[property]},${clickedId}`
        : clickedId + "";
    }
    setSearchQuery((opt) => ({ ...opt, [property]: ids }));
  }

  return (
    <div className="container mx-auto flex py-8 px-4">
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
                      c.id == searchQuery?.categoryId ||
                      (!searchQuery?.categoryId && c.id == 23) // id:23 = "All" is preselected
                        ? "font-bold"
                        : ""
                    } cursor-pointer`}
                    key={c.id}
                    onClick={() =>
                      setSearchQuery((opt) => ({ ...opt, categoryId: c.id }))
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
                    checked={searchQuery?.brandId?.includes(brand.id)}
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
          <div className="flex justify-between mb-6">
            <div>
              {router.query?.searchTerm && (
                <h2 className="text-xl">
                  Showing results for{" "}
                  <strong>"{router.query.searchTerm}"</strong>
                </h2>
              )}
            </div>
            <div className="">
              {/* <label htmlFor="sort">Sort by:</label> */}
              <select
                name="sort"
                id="sort"
                className="outline-none ml-2 bg-transparent"
                onChange={(e) =>
                  setSearchQuery((opt) => {
                    const value = e.target.value;
                    if (value.includes(",")) {
                      return {
                        ...opt,
                        sortBy: value.split(",")[0],
                        direction: value.split(",")[1],
                      };
                    }

                    return {
                      ...opt,
                      sortBy: value,
                    };
                  })
                }
              >
                <option value="id,desc">Newest</option>
                <option value="total_sold">Popular</option>
                <option value="price,asc">Price - ascending</option>
                <option value="price,desc">Price - descending</option>
              </select>
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* <div className="grid auto-cols-fr gap-8"> */}
              {searchQuery && result
                ? result.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
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
                      id={product.id}
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
