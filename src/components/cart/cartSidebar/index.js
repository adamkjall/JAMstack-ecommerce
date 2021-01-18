import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";
import usePrice from "@bigcommerce/storefront-data-hooks/use-price";
// import checkout  from "@bigcommerce/storefront-data-hooks/api/checkout";

import { useUI } from "contexts/ui/context";

import CrossIcon from "../../../../public/icons/close.svg";
import CartItem from "components/cart/cartItem";
import { useEffect, useRef } from "react";
import Link from "next/link";

const CartSidebar = () => {
  const { data, isEmpty } = useCart();
  const { displaySidebar, closeSidebar } = useUI();
  const { price: subTotal } = usePrice(
    data && { amount: data.base_amount, currencyCode: data.currency.code }
  );
  const { price: total } = usePrice(
    data && { amount: data.cart_amount, currencyCode: data.currency.code }
  );

  const items = data?.line_items.physical_items ?? [];

  const ref = useRef();

  const handleClickOutside = (e) => {
    if (ref.current.contains(e.target)) return;

    closeSidebar();
  };

  // this effect makes sure clicks outside sidebar closes the sidebar
  useEffect(() => {
    if (displaySidebar) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [displaySidebar]);

  return (
    <aside
      ref={ref}
      className={`${
        displaySidebar ? "" : "translate-x-full"
      } fixed transform top-0 right-0 w-96 h-full bg-white ease-in-out transition-all duration-300 z-30 p-4 shadow-lg`}
    >
      <header className="mb-4">
        <CrossIcon
          className="cursor-pointer"
          width="24"
          onClick={closeSidebar}
        />
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
              {/* TODO what to show here */}
              {/* <li className="flex justify-between">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li> */}
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
            onClick={closeSidebar}
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </a>
      </Link>
    </aside>
  );
};

export default CartSidebar;
