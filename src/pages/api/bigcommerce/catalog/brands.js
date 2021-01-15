import { getBrands } from "lib/bigcommerce/rest";

export default async function (req, res) {
  const brands = await getBrands();

  res.json(brands);
}
