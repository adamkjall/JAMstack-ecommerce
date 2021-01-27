import { useEffect, useRef } from "react";
import Link from "next/link";

import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";
import usePrice from "@bigcommerce/storefront-data-hooks/use-price";

import { useUI } from "contexts/ui";
import CartItem from "components/cart/cartItem";

import CrossIcon from "../../../../public/icons/close.svg";

const CartSidebar = () => {
  const { data, isEmpty } = useCart();
  const { displayCartSidebar, closeCartSidebar } = useUI();
  // const { price: subTotal } = usePrice(
  //   data && { amount: data.base_amount, currencyCode: data.currency.code }
  // );
  const { price: total } = usePrice(
    data && { amount: data.cart_amount, currencyCode: data.currency.code }
  );

  const items = data?.line_items.physical_items ?? [];

  const ref = useRef();

  const handleClickOutside = (e) => {
    if (ref.current.contains(e.target)) return;

    closeCartSidebar();
  };

  // this effect makes sure clicks outside sidebar closes the sidebar
  useEffect(() => {
    if (displayCartSidebar) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [displayCartSidebar]);

  return (
    <aside
      ref={ref}
      className={`${
        displayCartSidebar ? "" : "translate-x-full"
      } fixed transform top-0 right-0 w-full md:w-96 h-full bg-white ease-in-out transition-all duration-300 z-50 p-4 shadow-lg`}
    >
      <header className="mb-4">
        <button
          name="close cart"
          className="focus:outline-none"
          onClick={closeCartSidebar}
        >
          <CrossIcon width="24" />
        </button>
      </header>
      {isEmpty ? (
        <div>
          <h2>Cart is empty</h2>
        </div>
      ) : (
        <div>
          <div>
            <ul>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data.currency.code}
                />
              ))}
            </ul>
          </div>
          <div>
            <ul>
              <li className="flex justify-between">
                <span>Total</span>
                <span>{total}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Link href="/checkout">
        <a>
          <button
            className={`${
              items.length === 0
                ? "bg-gray-300"
                : "bg-black hover:bg-white hover:text-black hover:border-black"
            } w-full font-mono font-bold text-lg text-white py-1.5 px-4 mt-6 border-transparent border-2`}
            onClick={closeCartSidebar}
            disabled={items.length === 0}
            name="close cart"
          >
            Checkout
          </button>
        </a>
      </Link>
    </aside>
  );
};

export default CartSidebar;
