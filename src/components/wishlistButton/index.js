// import useAddItem from "@bigcommerce/storefront-data-hooks/wishlist/use-add-item";
// import useRemoveItem from "@bigcommerce/storefront-data-hooks/wishlist/use-remove-item";
// import useWishlist from "@bigcommerce/storefront-data-hooks/wishlist/use-wishlist";
// import {} from "@bigcommerce/storefront-data-hooks/use-customer";

import { useState } from "react";
import { useCookies } from "react-cookie";

import HeartIcon from "../../../public/icons/heart.svg";
import FilledHeartIcon from "../../../public/icons/heart-filled.svg";

import styles from "./styles.module.scss";

const COOKIE_NAME = "wishlist";

const WishlistButton = ({ productId, variant }) => {
  const [cookie, setCookie, removeCookie] = useCookies([COOKIE_NAME]);

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
    // if we have a cookie
    if (cookie?.[COOKIE_NAME]) {
      // if productId is already in wishlist
      const inWhishlist = cookie[COOKIE_NAME][productId];
      if (inWhishlist) {
        // .. remove it from wishlist
        const whishlist = { ...cookie[COOKIE_NAME] };
        delete whishlist[productId];
        setCookie(COOKIE_NAME, whishlist);
      } else {
        // if it's not in wishlist, add it
        setCookie(COOKIE_NAME, {
          ...cookie[COOKIE_NAME],
          [productId]: productId,
        });
      }
    } // if we dont have a cookie, create one
    else setCookie(COOKIE_NAME, { [productId]: productId });
  }

  const checked = cookie?.[COOKIE_NAME]?.[productId];

  return (
    <div onClick={handleClick} className="absolute right-0 z-50">
      {checked ? (
        <FilledHeartIcon
          width="24"
          className={`fill-current stroke-current text-pink-500`}
        />
      ) : (
        <HeartIcon
          width="24"
          className={`fill-current stroke-current text-pink-500`}
        />
      )}
    </div>
  );
};

export default WishlistButton;
