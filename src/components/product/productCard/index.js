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

  return (
    <Link href={"/product" + product.node.path}>
      <div className="rounded shadow-lg p-4 cursor-pointer">
        <div style={{ position: "relative", width: "auto", height: "200px" }}>
          <Image
            src={product.node.defaultImage.url320wide || "/"}
            alt={product.node.defaultImage.altText || "Product"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="brand text-sm mt-2">{product.node?.brand?.name}</div>
        <h2 className="text-lg ">{product.node.name}</h2>
        <div className="flex justify-between text-xl mt-3 ">
          <span className={`${onSale && "text-red-500"}`}>{price}</span>
          {onSale && (
            <span className="line-through opacity-40">{basePrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
