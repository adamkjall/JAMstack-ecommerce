import { useState } from "react";
import parse from "html-react-parser";

import useAddItem from "@bigcommerce/storefront-data-hooks/cart/use-add-item";
import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

import { useUI } from "contexts/ui/context";

import ProductCard from "../productCard";
import ImageGallery from "../../imageGallery";

const ProductView = ({ product }) => {
  const [loading, setLoading] = useState(false);
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

  console.log("prod", product);

  const sizes = product.options.edges.find(
    (option) => option.node.displayName === "Size"
  );
  const colors = product.options.edges.find(
    (option) => option.node.displayName === "Color"
  );

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 gap-16 pb-16">
        <ImageGallery images={product.images.edges} />
        <div>
          <div className="brand">{product?.brand?.name}</div>
          <h2 className="text-2xl bold">{product.name}</h2>
          <div className="price flex justify-between text-2xl mt-4">
            <span className={`${onSale && "text-red-500"}`}>{price}</span>
            {onSale && (
              <span className="line-through opacity-40">{basePrice}</span>
            )}
          </div>

          <div className="options mt-2">
            {sizes && (
              <div>
                <label htmlFor="sizes">Size:</label>
                <select name="sizes" id="sizes" className="ml-2">
                  {sizes.node.values.edges.map((val) => (
                    <option value={val.node.label}>{val.node.label}</option>
                  ))}
                </select>
              </div>
            )}
            {colors && (
              <div>
                <label htmlFor="colors">Color:</label>
                <select name="colors" id="colors" className="ml-2">
                  {colors.node.values.edges.map((val) => (
                    <option value={val.node.label}>{val.node.label}</option>
                  ))}
                </select>
              </div>
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
      {product.relatedProducts.edges.length > 0 && (
        <div>
          <h2 className="text-xl mt-12">Related products</h2>

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
