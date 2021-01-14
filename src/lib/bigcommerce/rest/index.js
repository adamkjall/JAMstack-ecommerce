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
