import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";

import { getProducts } from "lib/bigcommerce/graphql/operations";
import { getCategories, getBrands } from "lib/bigcommerce/rest";

import useSearch from "hooks/useSearch";

import { shallowEqual } from "utils";

import CloseIcon from "../../public/icons/close.svg";
import NextIcon from "../../public/icons/next.svg";
import SettingsIcon from "../../public/icons/settings.svg";

export default function Products({ products, categories, brands }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const { result, error, loading } = useSearch(searchQuery);

  // save the query to state
  useEffect(() => {
    const hasQuery = JSON.stringify(router.query) !== "{}";
    if (!hasQuery) {
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
      router.push(
        {
          query,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [searchQuery]);

  console.log("searchQuery", searchQuery);
  console.log("Cat", categories);
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

  function resetSearchTerm() {
    if (searchQuery?.searchTerm) {
      const query = { ...searchQuery };
      delete query.searchTerm;
      setSearchQuery(query);
    }
  }

  return (
    <div className="container overflow-hidden relative mx-auto flex flex-col md:flex-row ">
      {showFilter ? (
        <div
          className={`fixed overflow-hidden w-full bg-white z-20 md:mr-10 p-4 flex flex-col -mt-px`}
          style={{ height: "calc(100vh - 70px" }}
        >
          <div className="categories">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold mb-2">Categories</h3>
            </div>
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
                      } cursor-pointer text-xl`}
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
          <div className="brands mt-4">
            <h3 className="text-2xl font-bold mb-2">Brands</h3>
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
                    <label className="ml-2 text-xl" htmlFor={brand.id}>
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className="flex justify-center items-end flex-1"
            onClick={() => setShowFilter(false)}
          >
            <div className="flex">
              <span className="pr-2 pb-2 text-xl">Hide filters</span>

              <CloseIcon width="24" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="fixed z-20 w-full grid grid-cols-2 gap-4 justify-items-start items-center px-4 py-2 -mt-px text-white"
            style={{ backgroundColor: "#0C7AA4" }}
          >
            <div
              className="w-full flex justify-between items-center"
              onClick={() => setShowFilter(true)}
            >
              <span className="">Filters</span>
              <SettingsIcon width="18" fill="white" stroke="white" />
            </div>

            {/* <label htmlFor="sort">Sort by:</label> */}
            <div className="w-full">
              <select
                name="sort"
                id="sort"
                className="outline-none bg-transparent w-full"
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
                <option value="id,desc" className="text-black">
                  Newest
                </option>
                <option value="total_sold" className="text-black">
                  Popular
                </option>
                <option value="price,asc" className="text-black">
                  Price (asc)
                </option>
                <option value="price,desc" className="text-black">
                  Price (desc)
                </option>
              </select>
            </div>
          </div>
          {!products ? (
            <Spinner />
          ) : (
            <div className="px-4 mb-8 mt-8 flex-1">
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  {router.query?.searchTerm && (
                    <div className="flex items-center">
                      <h2 className="text-xl">
                        Showing results for{" "}
                        <strong>"{router.query.searchTerm}"</strong>
                      </h2>
                      <button
                        onClick={resetSearchTerm}
                        className="ml-4  bg-gray-700 rounded-full shadow-sm"
                      >
                        <CloseIcon
                          width="20"
                          height="20"
                          className="pt-1 stroke-current text-white"
                          strokeWidth="2"
                          // stroke={"white"}
                          // fill={"white"}
                        />
                      </button>
                    </div>
                  )}
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
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  const products = await getProducts("newest", 40);
  let categories = await getCategories();
  const brands = await getBrands();

  // categories = categories.filter(category => name)

  return {
    props: {
      products,
      categories,
      brands,
    },
  };
}
