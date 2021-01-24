import { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Image from "next/image";
import parse from "html-react-parser";

import useAddItem from "@bigcommerce/storefront-data-hooks/cart/use-add-item";
import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

import { useUI } from "contexts/ui";

import ProductCard from "components/product/productCard";
import ImageGallery from "components/imageGallery";

import {
  getCurrentVariant,
  getProductOptions,
  getSizesForColorVariant,
  mapColorsToImages,
} from "../helpers";

import styles from "./index.module.scss";

const ProductView = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState();
  const [sizes, setSizes] = useState();
  const [colors, setColors] = useState();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const router = useRouter();

  const addItem = useAddItem();
  const { openCartSidebar } = useUI();
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
    // find intial options
    const intialChoices = options.reduce(
      (choices, opt) => ({
        ...choices,
        [opt.displayName]: opt.values[0].label,
      }),
      {}
    );
    setChoices(intialChoices);

    const hasColorOption = product.productOptions.edges.find(
      ({ node }) => node.displayName.toLowerCase() === "color"
    );
    if (hasColorOption) {
      // map colors with product image
      const colorMap = mapColorsToImages(product);
      setColors(colorMap);
    }
  }, [router.query]);

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

  // console.log("variants", product.variants.edges);
  // console.log("options", options);
  // console.log("choices", choices);
  // console.log("selected", selectedVariant);
  // console.log("product", product);
  // console.log("sizes", sizes);
  // console.log("colors", colors);

  const addToCart = async () => {
    // TODO check if required choices are selcted before adding
    setLoading(true);
    try {
      await addItem({
        productId: product.entityId,
        variantId: selectedVariant?.node.entityId,
      });
      openCartSidebar();
    } catch (error) {
      console.log("Error adding to cart", error);
    } finally {
      setLoading(false);
    }
  };

  const onSale = product.prices.price.value < product.prices.basePrice.value;
  const inStock = selectedVariant?.node.inventory?.isInStock ?? true;

  return (
    <div className="container mx-auto my-8">
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
        <div>
          <ImageGallery images={product.images.edges} />
        </div>
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
              {/* TODO refactor component  */}
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
                        }  px-1 py-1.5 flex items-center cursor-pointer`}
                        onClick={() =>
                          setChoices((choices) => ({
                            ...choices,
                            color: color,
                          }))
                        }
                      >
                        {imageUrl ? (
                          <div
                            style={{
                              position: "relative",
                              width: "60px",
                              height: "60px",
                            }}
                          >
                            <Image
                              src={imageUrl}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        ) : (
                          <div className="px-1">{color}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {sizes && (
                <div className="mt-2">
                  <div className="mb-2">
                    <strong>Size:</strong>
                  </div>
                  <div className="flex space-x-3">
                    {/* TODO refactor component  */}
                    {sizes.map((size) => (
                      <div
                        key={size.entityId}
                        className={`${
                          choices.size === size.label &&
                          (!size.inventory || size.inventory.isInStock)
                            ? "bg-green-500 text-white"
                            : size.inventory && !size?.inventory?.isInStock
                            ? "bg-red-400"
                            : "bg-gray-200"
                        } font-bold px-4 py-2 cursor-pointer`}
                        onClick={() =>
                          setChoices((choices) => ({
                            ...choices,
                            size: size.label,
                          }))
                        }
                      >
                        {size.label}
                      </div>
                    ))}
                  </div>
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
          <div className={styles.parsedWrapper}>
            {parse(product.description)}
          </div>
        </div>
      </div>
      {product.relatedProducts.edges.length > 0 && (
        <div>
          <h2 className="text-xl mt-12">Related products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {product.relatedProducts.edges
              .slice(0, 4)
              .map(({ node: product }) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  brand={product.brand?.name}
                  retailPrice={product.prices.price.value}
                  originalPrice={product.prices.basePrice.value}
                  currencyCode={product.prices.price.currencyCode}
                  path={product.path}
                  imgUrl={product.defaultImage.url320wide}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;
