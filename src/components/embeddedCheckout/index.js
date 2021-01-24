import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { embedCheckout } from "@bigcommerce/checkout-sdk";
import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";

function EmbeddedCheckout(props) {
  const { data } = useCart();
  const [checkoutLoaded, setCheckoutLoaded] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["bc_cartId"]);

  const containerId = props.containerId || "checkout-container";

  useEffect(() => {
    const handleEmbed = async () => {
      console.log("cookie", cookie);
      try {
        const resp = await axios.post("/api/bigcommerce/embedded-checkout", {
          cartId: data?.id,
        });
        const url = resp.data.data.embedded_checkout_url;
        return await embedCheckout({
          containerId,
          url,
          onError: (err) => console.error(err),
          onFrameError: (err) => console.error(err),
          onComplete: () => removeCookie("bc_cartId"), // clears cart
        });
      } catch (err) {
        console.error(err);
      } finally {
        setCheckoutLoaded(true);
      }
    };
    if (data?.id && !checkoutLoaded) {
      handleEmbed();
    }
  }, [data]);

  return (
    <div
      id={containerId}
      className="relative py-4"
      style={{ minHeight: "300px" }}
    />
  );
}

export default EmbeddedCheckout;
