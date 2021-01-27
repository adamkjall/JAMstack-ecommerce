import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProductCard from "components/product/productCard";
import Spinner from "components/spinner";
import Filter from "components/filter";
import SortBy from "components/sortBy";

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
  // console.log("Cat", categories);
  // console.log("query", router.query);
  console.log("products", result);

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
    <div className="md:container overflow-hidden relative md:mx-auto flex flex-col md:flex-row md:px-4 md:pt-4">
      {showFilter ? (
        <div
          className={`fixed overflow-hidden w-full bg-white z-20 md:mr-10 p-4 flex flex-col -mt-px`}
          style={{ height: "calc(100vh - 70px" }}
        >
          <Filter
            categories={categories}
            brands={brands}
            handleChange={handleCheck}
            searchQuery={searchQuery}
          />
          <div className="flex justify-center items-end flex-1">
            <div className="grid grid-cols-2 w-full">
              <button
                className="btn btn-blue"
                onClick={() => setShowFilter(false)}
              >
                Apply
              </button>
              <button
                className="btn btn-black"
                onClick={() => {
                  setSearchQuery({});
                  setShowFilter(false);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="md:hidden fixed z-20 w-full px-4 py-2 -mt-px text-white"
            style={{ backgroundColor: "#0C7AA4" }}
          >
            <div className="container mx-auto grid grid-cols-2 gap-20 justify-items-center items-center">
              <div
                className="w-full flex justify-between items-center"
                onClick={() => setShowFilter(true)}
              >
                <span className="">Filter</span>
                <SettingsIcon width="18" fill="white" stroke="white" />
              </div>

              <div className="w-full">
                <SortBy setSearchQuery={setSearchQuery} />
              </div>
            </div>
          </div>
          <div className="hidden md:block mr-4">
            <Filter
              categories={categories}
              brands={brands}
              handleChange={handleCheck}
              searchQuery={searchQuery}
            />
          </div>
          {!products ? (
            <Spinner />
          ) : (
            <div className="mb-8 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="col-span-2 justify-self-center mt-12 md:mt-0">
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
                <div className="hidden md:block justify-self-end">
                  <SortBy setSearchQuery={setSearchQuery} />
                </div>
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <div
                  className="grid gap-8 w-full"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  }}
                >
                  {/* <div className="grid auto-cols-fr gap-8"> */}
                  {searchQuery && result
                    ? result
                        .filter((product) => {
                          const filterSale = searchQuery?.categoryId
                            .split(",")
                            .find((id) => id == 24);
                          if (filterSale)
                            return product.categories.find((id) => id == 24);
                          return true;
                        })
                        .filter((product) => {
                          const showAll =
                            searchQuery?.categoryId.includes("18") &&
                            searchQuery?.categoryId.includes("19");

                          if (showAll) return true;
                          const men = searchQuery?.categoryId.includes("18");
                          if (men) {
                            return product.categories.find((id) => id == 18);
                          } else
                            return product.categories.find((id) => id == 19);
                        })
                        .map((product) => (
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

  categories = categories.filter((category) => category.name !== "All");

  return {
    props: {
      products,
      categories,
      brands,
    },
  };
}
