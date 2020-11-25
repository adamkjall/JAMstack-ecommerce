import Image from "next/image";

import parse from "html-react-parser";

const ProductView = ({ product }) => {
  const images = product.images.edges;
  const prices = product.prices;
  console.log("product", product);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <Image
          src={images[0]?.node.urlOriginal}
          alt={images[0]?.node.altText}
          width="400"
          height="600"
          quality="85"
        />
        <div>
          <div className="">Brand: {product?.brand?.entityId}</div>
          <h2 className="text-2xl bold">{product.name}</h2>
          <div className="flex justify-between">
            <div className="text-2xl mt-4">
              <span
                className={
                  prices.salePrice && "line-through text-gray-400 bold"
                }
              >
                ${prices.price.value}
              </span>
              {prices.salePrice && (
                <span className="text-red-600 ml-4 bold">
                  ${prices.salePrice?.value}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {parse(product.description)}
    </div>
  );
};

export default ProductView;
