const DEFAULT_OPTIONS = {
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Auth-Token": process.env.BIGCOMMERCE_STORE_API_TOKEN,
  },
};

export async function getCategories() {
  const response = await fetch(
    `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/catalog/categories`,
    DEFAULT_OPTIONS
  );
  const data = await response.json();
  return data.data;
}

export async function getCategoryById(categoryId) {
  const response = await fetch(
    `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/catalog/categories/${categoryId}`,
    DEFAULT_OPTIONS
  );
  const data = await response.json();
  return data.data;
}

export async function getProductsByCategoryId(categoryId) {
  const response = await fetch(
    `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/catalog/products?categories:in=${categoryId}`,
    DEFAULT_OPTIONS
  );
  const data = await response.json();
  return data.data;
}

export async function getProductImages(productId) {
  const response = await fetch(
    `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/catalog/products/${productId}/images`,
    DEFAULT_OPTIONS
  );
  const data = await response.json();
  return data.data;
}

/**
 *
 * @param {Object} filterOptions object with any of the keys categories, searchTerm, sortBy, direction
 * @param {number} filterOptions.categories categories as ids, eg. 12, "12" or "12,18,20"
 * @param {string} filterOptions.searchTerm will match with a products name, description or sku
 * @param {string} filterOptions.sortBy Allowed Values: id, name, sku, price, date_modified, date_last_imported, inventory_level, is_visible, total_sold
 * @param {string} filterOptions.direction Allowed Values: asc, desc
 */
export async function getProducts({
  categories,
  searchTerm,
  sortBy,
  direction,
}) {
  const categoryParam = categories ? "categories:in=" + categories : "";
  const searchParam = searchTerm ? "keyword=" + searchTerm : "";
  const sortParam = sortBy ? "sort=" + sortBy : "";
  const directionPram = direction ? "direction=" + direction : "";

  const params = [categoryParam, searchParam, sortParam, directionPram].join(
    "&"
  );

  const response = await fetch(
    `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/catalog/products?${params}`,
    DEFAULT_OPTIONS
  );
  const data = await response.json();
  return data.data;
}
