import {
  getProducts,
  getProductImages,
  getBrandById,
} from "lib/bigcommerce/rest";

export default async function (req, res) {
  const filterOptions = req.body;

  let products = await getProducts(filterOptions);
  products = await getAdditionalProductData(products);

  res.json(products);
}

// Fetch additional product data
async function getAdditionalProductData(products) {
  const requests = products.map(async (product) => {
    const images = await getProductImages(product.id);
    const defaultImage = images.find((image) => image.is_thumbnail);

    let brand;
    // brand_id = 0 means no brand
    if (product.brand_id !== 0) {
      brand = await getBrandById(product.brand_id);
    }

    return {
      ...product,
      imgUrl: defaultImage?.url_thumbnail,
      brand: brand?.name,
    };
  });

  return Promise.all(requests).catch(console.log);
}
