import axios from "axios";
import { embedCheckout } from "@bigcommerce/checkout-sdk";
import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";
import { useEffect, useState } from "react";

function EmbeddedCheckout(props) {
  const { data } = useCart();
  const [checkoutLoaded, setCheckoutLoaded] = useState(false);

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
        });
        setCheckoutLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    if (data && !checkoutLoaded) handleEmbed();
  }, [data]);

  return <div id={containerId} />;
}

export default EmbeddedCheckout;
