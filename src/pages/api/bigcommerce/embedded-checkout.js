import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const url = `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/carts/${req.body.cartId}/redirect_urls`;

    try {
      const resp = await axios.post(
        url,
        {},
        {
          headers: {
            "X-Auth-Client": process.env.BIGCOMMERCE_STORE_API_CLIENT_ID,
            "X-Auth-Token": process.env.BIGCOMMERCE_STORE_API_TOKEN,
          },
        }
      );

      res.setHeader("Content-Type", "application/json");
      res.status(200).json(resp.data);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${res.method} not allowed`);
  }
};
