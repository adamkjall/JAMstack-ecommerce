import {
  getProductsByCategoryId,
  getProductImages,
} from "lib/bigcommerce/rest";

export default async function (req, res) {
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Only accept GET requests to this endpoint" });
  }

  const categoryId = req.query.id;

  if (isNaN(categoryId)) {
    res.status(500).json({ message: "CategoryId must be a number" });
  }

  let products = await getProductsByCategoryId(categoryId);

  products = await appendProductImages(products);

  res.json(products);
}

async function appendProductImages(products) {
  const requests = products.map((product) => {
    return getProductImages(product.id).then((images) => ({
      ...product,
      imgUrl: images?.[0].url_thumbnail,
    }));
  });

  return Promise.all(requests);
}
