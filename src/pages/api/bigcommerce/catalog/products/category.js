import { getProductsByCategoryId } from "lib/bigcommerce/rest";

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

  const products = await getProductsByCategoryId(categoryId);
  res.json(products);
}
