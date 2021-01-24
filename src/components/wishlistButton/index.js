// import useAddItem from "@bigcommerce/storefront-data-hooks/wishlist/use-add-item";
// import useRemoveItem from "@bigcommerce/storefront-data-hooks/wishlist/use-remove-item";
// import useWishlist from "@bigcommerce/storefront-data-hooks/wishlist/use-wishlist";
// import {} from "@bigcommerce/storefront-data-hooks/use-customer";

import { useState } from "react";

import HeartIcon from "../../../public/icons/heart.svg";

import styles from "./styles.module.scss";

const WishlistButton = ({ productId, variant }) => {
  const [checked, setChecked] = useState(true);
  // const addItem = useAddItem();
  // const removeItem = useRemoveItem();
  // const { data } = useWishlist();

  // const itemInWishlist = data?.items?.find(
  //   (item) => item.product_id === productId
  //  &&
  // item.variant_id === variant?.node.entityId
  // );

  // const handleWishlistChange = async (e) => {
  //   e.preventDefault();

  // if (!customer) {
  //   return;
  // }

  // if (itemInWishlist) {
  //   await removeItem({ id: itemInWishlist.id });
  // } else {
  //   await addItem({
  //     productId,
  //     // variantId: variant?.node.entityId,
  //   });
  // }
  // };

  function handleClick(e) {
    // e.preventDefault();
    // e.stopImmediatePropagation();
    // console.log("i got clicked");
    // setChecked(!checked);
  }

  return (
    <div onClick={handleClick}>
      <HeartIcon
        width="24"
        className={`fill-current stroke-current text-pink-500`}
        strokeWidth="2"
        // style={{ fill: "red" }}
        // fill={checked ? "hotPink" : "black"}
        // stroke={checked ? "hotPink" : "black"}
      />
    </div>
  );
};

export default WishlistButton;
