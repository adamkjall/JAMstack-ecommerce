import Image from "next/image";
import Link from "next/link";

import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

const ProductCard = ({
  name,
  brand,
  retailPrice,
  originalPrice,
  currencyCode,
  path,
  imgUrl,
  altText,
}) => {
  const { price } = usePrice({
    amount: retailPrice,
    baseAmount: originalPrice,
    currencyCode,
  });
  const { price: basePrice } = usePrice({
    amount: originalPrice,
    currencyCode: currencyCode,
  });
  const onSale = retailPrice < originalPrice;

  return (
    <Link href={"/product" + path}>
      <a>
        <div className="rounded shadow-lg p-4 cursor-pointer">
          <div style={{ position: "relative", width: "auto", height: "300px" }}>
            <Image
              src={imgUrl || "/"}
              alt={altText || "Product"}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="brand text-sm mt-2">{brand}</div>
          <h2 className="text-lg ">{name}</h2>
          <div className="flex justify-between text-xl mt-3 ">
            <span className={`${onSale && "text-red-500"}`}>{price}</span>
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
