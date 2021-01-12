import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { embedCheckout } from "@bigcommerce/checkout-sdk";
import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";
import getCartCookie from "@bigcommerce/storefront-data-hooks/api/utils/get-cart-cookie";

function EmbeddedCheckout(props) {
  const { data } = useCart();
  const [checkoutLoaded, setCheckoutLoaded] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["bc_cartid"]);
  console.log(getCartCookie("bc_cartid"));

  const containerId = props.containerId || "V1StGXR8_Z5jdHi6B-myT";

  useEffect(() => {
    const handleEmbed = async () => {
      const resp = await axios.post("/api/bigcommerce/embedded-checkout", {
        cartId: data?.id,
      });
      const url = resp.data.data.embedded_checkout_url;
      try {
        await embedCheckout({
          containerId,
          url,
          onError: (err) => console.error(err),
          onFrameError: (err) => console.error(err),
          onComplete: () => {
            console.log("I completed");
            removeCookie("bc_cartid");
          },
        });
        setCheckoutLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    if (data && !checkoutLoaded) handleEmbed();
  }, [data]);

  return <div className="relative min-h-full py-4" id={containerId} />;
}

export default EmbeddedCheckout;
