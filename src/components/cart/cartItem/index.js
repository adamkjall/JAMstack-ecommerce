import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import usePrice from "@bigcommerce/storefront-data-hooks/use-price";
import useUpdateItem from "@bigcommerce/storefront-data-hooks/cart/use-update-item";
import useRemoveItem from "@bigcommerce/storefront-data-hooks/cart/use-remove-item";

import BinIcon from "../../../../public/icons/bin.svg";
import MinusIcon from "../../../../public/icons/minus.svg";
import PlusIcon from "../../../../public/icons/plus.svg";

const CartItem = ({ item, currencyCode }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [removing, setRemoving] = useState(false);
  const { price } = usePrice({
    amount: item.extended_sale_price,
    baseAmount: item.extended_list_price,
    currencyCode,
  });

  const updateItem = useUpdateItem(item);
  const removeItem = useRemoveItem(item);

  const incrementQuantity =
    quantity < 99 ? () => setQuantity(quantity + 1) : null;
  const decrementQuantity =
    quantity > 0 ? () => setQuantity(quantity - 1) : null;

  const updateIemQuantity = async (value) =>
    await updateItem({ quantity: value });

  const handleQuantity = (e) => {
    const value = Number(e.target.value);
    if (Number.isInteger(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removeItem({ id: item.id });
    } catch (error) {
      console.log("Error while removing item", error);
      setRemoving(false);
    }
  };

  useEffect(() => {
    updateIemQuantity(quantity);
  }, [quantity]);

  return (
    <li
      className={`${
        removing ? "opacity-75 pointer-events-none" : ""
      } flex flex-row space-x-8 py-8`}
    >
      <div className="w-16 h-16 relative overflow-hidden self-center">
        <Image
          src={item.image_url}
          width="60"
          height="60"
          alt="Product image"
          className="w-100 h-full"
        />
      </div>
      <div className="flex flex-1 flex-col text-base">
        <Link href="/">
          <span className="font-bold text-lg cursor-pointer">{item.name}</span>
        </Link>

        <div className="flex items-center">
          <MinusIcon
            className="cursor-pointer"
            width="24"
            type="button"
            onClick={decrementQuantity}
          />
          <label>
            <input
              className="w-8 border-accents-2 border mx-3 rounded text-center text-sm text-black"
              type="number"
              max={99}
              min={0}
              value={quantity}
              onChange={handleQuantity}
            />
          </label>
          <PlusIcon
            className="cursor-pointer"
            width="24"
            type="button"
            onClick={incrementQuantity}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-2 text-base">
        <span>{price}</span>
        <BinIcon
          type="button"
          width="24"
          className="justify-end cursor-pointer"
          onClick={handleRemove}
        />
      </div>
    </li>
  );
};

export default CartItem;
