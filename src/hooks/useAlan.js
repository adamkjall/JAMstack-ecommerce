import { useState, useEffect, useCallback } from "react";

import { useUI } from "contexts/ui/context";
import useAddItem from "@bigcommerce/storefront-data-hooks/cart/use-add-item";
import useRemoveItem from "@bigcommerce/storefront-data-hooks/cart/use-remove-item";
import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";

const COMMANDS = {
  OPEN_CART: "open-cart",
  CLOSE_CART: "close-cart",
  ADD_ITEM: "add-item",
  REMOVE_ITEM: "remove-item",
};

export default function useAlan(products) {
  const [alanInstance, setAlanInstance] = useState();
  const { openSidebar, closeSidebar } = useUI();
  const { data, isEmpty } = useCart();
  const addItem = useAddItem();
  const removeItem = useRemoveItem();

  const cartItems = data?.line_items.physical_items ?? [];

  const openCart = useCallback(() => {
    alanInstance.playText("Opening cart");
    openSidebar();
  }, [alanInstance, openSidebar]);

  const closeCart = useCallback(() => {
    alanInstance.playText("Closing cart");
    closeSidebar();
  }, [alanInstance, closeSidebar]);

  const addProduct = useCallback(
    async ({ detail: { name, quantity } }) => {
      const item = products.find((product) =>
        product.node.name.toLowerCase().includes(name.toLowerCase())
      );
      if (!item) {
        alanInstance.playText(`I cannot find the ${name} item`);
      } else {
        try {
          await addItem({
            productId: item.node.entityId,
            variantId: item.node.variants.edges?.[0].node.entityId,
            quantity: quantity,
          });
          openCart();
          alanInstance.playText(
            `Added ${quantity} of the ${name} item to your cart`
          );
        } catch (error) {
          console.log("Alan had error adding to cart", error);
        }
      }
    },
    [alanInstance, openCart]
  );

  const removeProduct = useCallback(
    async ({ detail: { name } }) => {
      if (isEmpty) {
        alanInstance.playText("Your cart is already empty");
        return;
      }

      const item = cartItems.find((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
      if (!item) {
        alanInstance.playText(`Try to remove. I cannot find the ${name} item`);
      } else {
        try {
          await removeItem({
            id: item.id,
          });
          alanInstance.playText(`Removed ${name} item from your cart`);
        } catch (error) {
          console.log("Alan had error remoing from cart", error);
        }
      }
    },
    [alanInstance, removeItem, cartItems, isEmpty]
  );

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart);
    window.addEventListener(COMMANDS.CLOSE_CART, closeCart);
    window.addEventListener(COMMANDS.ADD_ITEM, addProduct);
    window.addEventListener(COMMANDS.REMOVE_ITEM, removeProduct);

    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart);
      window.removeEventListener(COMMANDS.CLOSE_CART, closeCart);
      window.removeEventListener(COMMANDS.ADD_ITEM, addProduct);
      window.removeEventListener(COMMANDS.REMOVE_ITEM, removeProduct);
    };
  }, [openCart, closeCart]);

  useEffect(() => {
    if (alanInstance != null) return;

    const alanBtn = require("@alan-ai/alan-sdk-web");
    const instance = alanBtn({
      bottom: "25px",
      left: "15px",
      key: process.env.ALAN_SDK_KEY,
      rootEl: document.getElementById("alan-btn"),
      onCommand: ({ command, payload }) => {
        window.dispatchEvent(new CustomEvent(command, { detail: payload }));
      },
    });

    setAlanInstance(instance);
  }, []);

  return null;
}
