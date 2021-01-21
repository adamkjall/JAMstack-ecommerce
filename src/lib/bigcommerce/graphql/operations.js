import fetchGraphqlApi from "@bigcommerce/storefront-data-hooks/api/utils/fetch-graphql-api";
import {
  getProductsQuery,
  GET_PRODUCT_BY_SLUG,
  GET_VARIANT_BY_ID,
  GET_ALL_PRODUCT_PATHS,
} from "./queries";

/**
 * Fetches products from graphql api
 * @param {string} type type can be "all", "newest", "bestSelling", or "featured"
 * @param {int} first number of products
 * @param {string} cursor pagination identifier
 */
export const getProducts = async (type = "all", first = 10, cursor = "") => {
  type = type === "all" ? "products" : type + "Products"; // set type to match GraphQL api docs

  const res = await fetchGraphqlApi(getProductsQuery(type, first, cursor));
  const products = res.data.site[type].edges;

  return products;
};

export const getProductBySlug = async (slug) => {
  const paddedSlug = "/" + slug + "/";
  const res = await fetchGraphqlApi(GET_PRODUCT_BY_SLUG, {
    variables: { slug: paddedSlug },
  });

  return res.data.site.route.node;
};

export const getVariantById = async (entityId) => {
  const res = await fetchGraphqlApi(GET_VARIANT_BY_ID, {
    variables: { variantEntityId: entityId },
  });
  return res.data.site.product;
};

export const getAllProductPaths = async () => {
  const res = await fetchGraphqlApi(GET_ALL_PRODUCT_PATHS);
  return res.data.site.products.edges;
};
