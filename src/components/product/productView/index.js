import { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Image from "next/image";
import parse from "html-react-parser";

import useAddItem from "@bigcommerce/storefront-data-hooks/cart/use-add-item";
import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

import { useUI } from "contexts/ui/context";

import ProductCard from "components/product/productCard";
import ImageGallery from "components/imageGallery";

import {
  getCurrentVariant,
  getProductOptions,
  getSizesForColorVariant,
} from "../helpers";

const ProductView = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState();
  const [sizes, setSizes] = useState();
  const [colors, setColors] = useState();
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

  // run on component mount and product url change
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

    // set colors
    const colorData = product.variants.edges.reduce((acc, variant) => {
      const colorData = variant.node.productOptions.edges.find(
        (opt) => opt.node.displayName === "Color"
      );
      const color = colorData.node.values.edges[0].node.label;

      return { ...acc, [color]: variant.node.defaultImage.url160wide };
    }, {});

    setColors(colorData);
  }, [router.query]);
  console.log("colors2", colors);
  // sideeffect when product choices are changed
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

  const onSale = product.prices.price.value < product.prices.basePrice.value;
  const inStock = selectedVariant?.node.inventory.isInStock;

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
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <div className="price flex justify-between text-4xl mt-3 font-bold">
            <span className={`${onSale && "text-red-500"}`}>{price}</span>
            {onSale && (
              <span className="line-through opacity-40">{basePrice}</span>
            )}
          </div>

          {choices && (
            <div className="options mt-5">
              {colors && (
                <div className="">
                  <div className="mb-2">
                    <strong>Color:</strong> {choices.color}
                  </div>
                  <div className="flex">
                    {Object.entries(colors).map(([color, imageUrl]) => (
                      <div
                        key={color}
                        className={`${
                          choices.color === color && "border-2 border-black"
                        }  p-1 flex items-center`}
                      >
                        <Image
                          src={imageUrl}
                          width="60"
                          height="60"
                          onClick={() =>
                            setChoices((choices) => ({
                              ...choices,
                              color: color,
                            }))
                          }
                        ></Image>
                      </div>
                    ))}
                  </div>
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
                    {/* TODO prettify  */}
                    {sizes.map((size) => (
                      <option key={size.entityId} value={size.label}>
                        {size.label}{" "}
                        {!size.inventory?.isInStock && " (not in stock)"}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* TODO refactor button */}
          <button
            className={`${
              inStock ? "bg-black" : "bg-gray-400"
            }  text-white px-4 py-1 rounded mt-6`}
            onClick={addToCart}
            disabled={loading || !inStock}
          >
            ADD TO CART
          </button>
          {!inStock && <div className="text-red-600">Item not in stock</div>}
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
