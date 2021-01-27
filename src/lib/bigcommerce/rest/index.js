const DEFAULT_OPTIONS = {
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Auth-Token": process.env.BIGCOMMERCE_STORE_API_TOKEN,
  },
};

const myFetch = async (path) => {
  const response = await fetch(
    `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/${path}`,
    DEFAULT_OPTIONS
  );
  const data = await response.json();
  return data.data;
};

export async function getBrands() {
  return await myFetch("catalog/brands");
}

export async function getBrandById(brandId) {
  return await myFetch("catalog/brands/" + brandId);
}

export async function getCategories() {
  return await myFetch("catalog/categories");
}

export async function getCategoryById(categoryId) {
  return await myFetch("catalog/categories/" + categoryId);
}

export async function getProductsByCategoryId(categoryId) {
  return await myFetch(
    `catalog/products?categories:in=${categoryId}&is_visible=true`
  );
}

export async function getProductImages(productId) {
  return await myFetch(`catalog/products/${productId}/images`);
}

/**
 * Get products
 * @param {Object} filterOptions Object with filter entries
 * @param {string|number} filterOptions.categoryId Filter on category id, eg. 12, "12" or for serveral "12,18,20"
 * @param {string} filterOptions.searchTerm Filter by searchTerm, matches on properties name, description or sku
 * @param {string} filterOptions.sortBy Allowed Values: id, name, sku, price, date_modified, date_last_imported, inventory_level, is_visible, total_sold
 * @param {string} filterOptions.direction Allowed Values: asc, desc
 * @param {string|number} filterOptions.brandId Filter items by brand_id.
 */
export async function getProducts({
  categoryId,
  searchTerm,
  sortBy = "id",
  direction = "desc",
  brandId,
}) {
  const categoryParam = categoryId ? "categories:in=" + categoryId : "";
  const searchParam = searchTerm ? "keyword=" + searchTerm : "";
  const sortParam = sortBy ? "sort=" + sortBy : "";
  const directionPram = direction ? "direction=" + direction : "";
  const brandParam = brandId ? "brand_id:in=" + brandId : "";
  const isVisible = "is_visible=true";

  // request params
  const params = [
    categoryParam,
    searchParam,
    sortParam,
    directionPram,
    brandParam,
    isVisible,
  ]
    .filter((param) => param)
    .join("&");

  return await myFetch(`catalog/products?${params}`);
}
