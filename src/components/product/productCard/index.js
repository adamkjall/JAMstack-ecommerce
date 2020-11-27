import Image from "next/image";
import Link from "next/link";

import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

const ProductCard = ({ product }) => {
  const { price } = usePrice({
    amount: product.node.prices?.price?.value,
    baseAmount: product.node.prices?.retailPrice?.value,
    currencyCode: product.node.prices?.price?.currencyCode,
  });

  const imageData =
    product.node.images.edges.length && product.node.images.edges[0].node;

  return (
    <Link href={"/product" + product.node.path}>
      <a>
        <div className="rounded shadow-lg p-4">
          <Image
            src={imageData.urlOriginal || "/"}
            alt={imageData.altText || "Product card"}
            width="300"
            height="300"
          />
          <div className="">Brand: {product.node?.brand?.entityId}</div>
          <h2 className=" font-bold">{product.node.name}</h2>
          <div className="flex justify-between">
            <div className="text-lg mt-4">
              <span>{price}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
