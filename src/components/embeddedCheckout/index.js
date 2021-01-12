import { useEffect, useState } from "react";
import axios from "axios";
import { embedCheckout } from "@bigcommerce/checkout-sdk";
import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";

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
          onComplete: () => console.log("I completed"),
        });
        setCheckoutLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    if (data && !checkoutLoaded) handleEmbed();
  }, []);

  return <div className="relative h-full py-4" id={containerId} />;
}

export default EmbeddedCheckout;
