import { getCategories } from "lib/bigcommerce/rest";

export default async function (req, res) {
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Only accept GET requests to this endpoint" });
  }

  const categories = await getCategories();

  res.json(categories);
}
