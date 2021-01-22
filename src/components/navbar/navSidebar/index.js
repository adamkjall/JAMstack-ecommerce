import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUI } from "contexts/ui";

import Searchbar from "components/searchbar";

import CrossIcon from "../../../../public/icons/close.svg";

const NavSidebar = () => {
  const { displayMenuSidebar, closeMenuSidebar } = useUI();
  const ref = useRef();
  const { query } = useRouter();

  function handleClickOutside(e) {
    if (ref.current.contains(e.target)) return;
    closeMenuSidebar();
  }

  useEffect(() => {
    if (displayMenuSidebar) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [displayMenuSidebar]);

  return (
    <aside
      ref={ref}
      className={`${
        displayMenuSidebar ? "translate-x-full" : ""
      } fixed top-0 -left-full w-full h-full transform ease-in-out transition-all duration-300 z-50 p-4 bg-white`}
    >
      <header className="mb-4">
        <button className="focus:outline-none" onClick={closeMenuSidebar}>
          <CrossIcon width="24" />
        </button>
      </header>
      <nav className="flex flex-col items-center">
        <div
          className={`${""} flex space-x-8 uppercase justify-self-center font-semibold`}
        >
          <Link href={{ pathname: "/products", query: { categoryId: 19 } }}>
            <a className={`${query?.categoryId == 19 ? "navBorder" : ""}`}>
              Women
            </a>
          </Link>
          <Link href={{ pathname: "/products", query: { categoryId: 18 } }}>
            <a className={`${query?.categoryId == 18 ? "navBorder" : ""}`}>
              Men
            </a>
          </Link>
          {/*  TODO go to sale */}
          <Link href={{ pathname: "/products", query: {} }}>
            <a
              className={`${
                query?.categoryId == 20 ? "navBorder" : ""
              } text-red-500`}
            >
              Sale
            </a>
          </Link>
        </div>
      </nav>
      <div className="flex justify-center mt-6">
        <Searchbar />
      </div>
      <style jsx>{`
        a::after {
          display: block;
          content: "";
          border-bottom: solid 3px black;
          transform: scaleX(0);
          transition: transform 250ms ease-in-out;
        }
        .navBorder::after {
          transform: scaleX(1);
        }
      `}</style>
    </aside>
  );
};

export default NavSidebar;
