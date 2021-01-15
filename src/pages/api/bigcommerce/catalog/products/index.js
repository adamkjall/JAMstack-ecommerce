import { getProducts, getProductImages } from "lib/bigcommerce/rest";

export default async function (req, res) {
  // if (req.method !== "GET") {
  //   res
  //     .status(500)
  //     .json({ message: "Only accept GET requests to this endpoint" });
  // }

  console.log("req", req.body);
  const filterOptions = req.body;

  let products = await getProducts(filterOptions);

  products = await appendProductImages(products);

  res.json(products);
}

// Fetches additional thumbnail url for each product
async function appendProductImages(products) {
  const requests = products.map((product) => {
    return getProductImages(product.id).then((images) => {
      const defaultImage = images.find((image) => image.is_thumbnail);
      return {
        ...product,
        imgUrl: defaultImage.url_thumbnail,
      };
    });
  });

  return Promise.all(requests);
}
