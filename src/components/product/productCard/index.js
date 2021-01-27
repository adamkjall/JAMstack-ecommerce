import Image from "next/image";
import Link from "next/link";

import WishlistButton from "components/wishlistButton";

import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

const ProductCard = ({
  name,
  id,
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
    <div className="relative rounded-sm shadow-lg p-4 cursor-pointer bg-white">
      <div className="relative">
        <WishlistButton productId={id} />
      </div>
      <Link href={"/product" + path}>
        <a>
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
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
