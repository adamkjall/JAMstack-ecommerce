import { useState } from "react";
import Image from "next/image";

import parse from "html-react-parser";

import useAddItem from "@bigcommerce/storefront-data-hooks/cart/use-add-item";
import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

import useUi, { useUI } from "contexts/ui/context";

const ProductView = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const addItem = useAddItem();
  const { openSidebar } = useUI();
  const { price } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode,
  });
  const images = product.images.edges;

  const addToCart = async () => {
    setLoading(true);
    try {
      await addItem({
        productId: product.entityId,
        variantId: product.variants.edges?.[0].node.entityId,
      });
      openSidebar();
      setLoading(false);
    } catch (error) {
      console.log("Error adding to cart", error);
      setLoading(false);
    }
  };

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="w-92">
          <Image
            src={images[0]?.node.urlOriginal}
            alt={images[0]?.node.altText}
            width="400"
            height="400"
            quality="85"
          />
        </div>
        <div>
          <div className="">Brand: {product?.brand?.entityId}</div>
          <h2 className="text-2xl bold">{product.name}</h2>
          <div className="flex justify-between">
            <div className="text-2xl mt-4">
              <span className="">{price}</span>
            </div>
          </div>
          <button
            className="bg-black text-white px-4 py-1 rounded mt-4"
            onClick={addToCart}
            disabled={loading}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="py-4">{parse(product.description)}</div>
    </div>
  );
};

export default ProductView;
