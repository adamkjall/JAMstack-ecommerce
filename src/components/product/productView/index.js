import { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import parse from "html-react-parser";

import useAddItem from "@bigcommerce/storefront-data-hooks/cart/use-add-item";
import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

import { useUI } from "contexts/ui/context";

import ProductCard from "../productCard";
import ImageGallery from "../../imageGallery";

import {
  getCurrentVariant,
  getProductOptions,
  getSizesForColorVariant,
} from "../helpers";

const ProductView = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState();
  const [sizes, setSizes] = useState();
  const [selectedVariant, setSelectedVariant] = useState(null);
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
    const options = getProductOptions(product);
    const intialChoices = options.reduce(
      (choices, opt) => ({
        ...choices,
        [opt.displayName]: opt.values[0].label,
      }),
      {}
    );
    setChoices(intialChoices);

    if (intialChoices.color && intialChoices.size) {
      const sizesData = getSizesForColorVariant(product, intialChoices.color);
      setSizes(sizesData);
    }
  }, [router.query]);

  useEffect(() => {
    if (!choices) return;

    const variant = getCurrentVariant(product, choices);
    setSelectedVariant(variant);

    if (choices.color && choices.size) {
      const sizesData = getSizesForColorVariant(product, choices.color);
      setSizes(sizesData);
    }
  }, [choices]);

  // console.log("variant", variant);
  // console.log("variants", product.variants.edges);
  // console.log("options", options);
  // console.log("variant", variant);
  // console.log("choices", choices);
  // console.log("selected", selectedVariant);
  // console.log("product", product);
  // console.log("sizes", sizes);

  const addToCart = async () => {
    // TODO check if required choices are selcted before adding
    setLoading(true);
    try {
      await addItem({
        productId: product.entityId,
        variantId: selectedVariant?.node.entityId,
      });
      openSidebar();
      setLoading(false);
    } catch (error) {
      console.log("Error adding to cart", error);
      setLoading(false);
    }
  };

  const colors = product.productOptions.edges.find(
    (option) => option.node.displayName === "Color"
  );
  const onSale = product.prices.price.value < product.prices.basePrice.value;

  return (
    <div className="my-8">
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: "website",
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images.edges?.[0]?.node.urlOriginal,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
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

          {choices && (
            <div className="options mt-4">
              {colors && (
                <div className="flex items-center space-x-3">
                  <strong>Color:</strong>
                  {colors.node.values.edges.map((color, i) => (
                    <div
                      key={i}
                      className={`${
                        choices.color === color.node.label &&
                        "border-2 border-black border-"
                      } rounded-full`}
                    >
                      <div
                        className={`rounded-full w-8 h-8 m-px`}
                        style={{
                          backgroundColor: `${color.node.hexColors[0]}`,
                        }}
                        onClick={() =>
                          setChoices((choices) => ({
                            ...choices,
                            color: color.node.label,
                          }))
                        }
                      ></div>
                    </div>
                  ))}
                </div>
              )}
              {sizes && (
                <div className="mt-3">
                  <label htmlFor="sizes">
                    <strong>Size:</strong>
                  </label>
                  <select
                    name="sizes"
                    id="sizes"
                    className="ml-2"
                    defaultValue={choices.size}
                    onChange={(e) =>
                      setChoices((choices) => ({
                        ...choices,
                        size: e.target.value,
                      }))
                    }
                  >
                    {/* TODO prettify & prohibit item that's not in stock to be placed in cart */}
                    {sizes.map((size) => (
                      <option key={size.entityId} value={size.label}>
                        {size.label}{" "}
                        {size.inventory?.isInStock
                          ? " in stock"
                          : " not in stock"}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* TODO refactor button */}
          <button
            className="bg-black text-white px-4 py-1 rounded mt-6"
            onClick={addToCart}
            disabled={loading}
          >
            ADD TO CART
          </button>
          <div className="pt-8">{parse(product.description)}</div>
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
