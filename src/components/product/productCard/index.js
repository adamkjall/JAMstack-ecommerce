import Image from "next/image";
import Link from "next/link";

import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

const ProductCard = ({ product }) => {
  const { price } = usePrice({
    amount: product.node.prices?.price?.value,
    baseAmount: product.node.prices?.basePrice?.value,
    currencyCode: product.node.prices?.price?.currencyCode,
  });

  const { price: basePrice } = usePrice({
    amount: product.node.prices?.basePrice?.value,
    currencyCode: product.node.prices?.basePrice?.currencyCode,
  });

  const onSale =
    product.node.prices?.price.value < product.node.prices.basePrice.value;

  const defaultImage = product.node.images.edges.find(
    (imgData) => imgData.node.isDefault
  );

  return (
    <Link href={"/product" + product.node.path}>
      <a>
        <div className="rounded shadow-lg p-4">
          <Image
            src={defaultImage?.node.url320wide || "/"}
            alt={defaultImage?.node.altText || "Product image"}
            width="320"
            height="320"
          />
          <div className="brand text-sm mt-2">{product.node?.brand?.name}</div>
          <h2 className="text-lg ">{product.node.name}</h2>
          <div className="flex justify-between text-xl mt-3 ">
            <span>{price}</span>
            {onSale && (
              <span className="line-through opacity-40">{basePrice}</span>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
