import { useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";

import useAddItem from "@bigcommerce/storefront-data-hooks/cart/use-add-item";
import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

import { useUI } from "contexts/ui/context";

import ProductCard from "../productCard";

const ProductView = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState({});
  const router = useRouter();
  const addItem = useAddItem();
  const { openSidebar } = useUI();

  const { price } = usePrice({
    amount: product.prices.price.value,
    baseAmount: product.prices.basePrice.value,
    currencyCode: product.prices.price.currencyCode,
  });
  const { price: basePrice } = usePrice({
    amount: product.prices.basePrice.value,
    currencyCode: product.prices.basePrice.currencyCode,
  });

  useEffect(() => {
    if (product) {
      const defaultImage = product.images.edges.find(
        (imgData) => imgData.node.isDefault
      );
      setActiveImage(defaultImage);
    }
  }, [router.query]);

  const onSale = product.prices.price.value < product.prices.basePrice.value;

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
  // console.log("prod", {
  //   productId: product.entityId,
  //   variantId: product.variants.edges?.[0].node.entityId,
  // });
  return (
    <div className="my-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <Image
            src={activeImage?.node?.url640wide || "/"}
            alt={activeImage?.node?.altText || "Product"}
            width="640"
            height="700"
            quality="85"
          />
          <div className="grid grid-flow-col gap-6 mt-4">
            {/* TODO fix slow change of image, image gallery component? */}
            {product.images.edges.map((imageData) => (
              <Image
                className="cursor-pointer"
                key={imageData.node.url160wide}
                src={imageData.node.url160wide}
                alt={imageData.node.altText || "Product"}
                width="160"
                height="200"
                quality="75"
                onClick={() => setActiveImage(imageData)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="brand">{product?.brand?.name}</div>
          <h2 className="text-2xl bold">{product.name}</h2>
          <div className="flex justify-between text-2xl mt-4">
            <span className={`${onSale && "text-red-500"}`}>{price}</span>
            {onSale && (
              <span className="line-through opacity-40">{basePrice}</span>
            )}
          </div>
          {/* TODO refactor button */}
          <button
            className="bg-black text-white px-4 py-1 rounded mt-4"
            onClick={addToCart}
            disabled={loading}
          >
            ADD TO CART
          </button>
          <div className="py-4">{parse(product.description)}</div>
        </div>
      </div>
      {product.relatedProducts.edges.length && (
        <div>
          <h2 className="text-xl mt-8 mb-4">Reltated products</h2>

          <div className="flex space-x-4">
            {product.relatedProducts.edges.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;
