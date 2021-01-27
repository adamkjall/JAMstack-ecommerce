import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "../../../public/icons/fox-icon.svg";
import CartIcon from "../../../public/icons/cart.svg";
import UserIcon from "../../../public/icons/user.svg";
import HeartIcon from "../../../public/icons/heart.svg";
import MenuIcon from "../../../public/icons/menu.svg";

import Searchbar from "components/searchbar";

import { useUI } from "contexts/ui";

import styles from "./styles.module.scss";

const Navbar = () => {
  const { openCartSidebar, openMenuSidebar } = useUI();
  const { query, pathname } = useRouter();

  return (
    <header className="fixed z-50 w-full bg-white shadow-md">
      <nav className={`${styles.nav} container mx-auto py-3 px-4 text-lg`}>
        <Link href="/">
          <a className={`${styles.logo} cursor-pointer`}>
            <span className="hidden">Go to home</span>
            <Logo width="45" />
          </a>
        </Link>
        <div className={styles.linksWrapper}>
          <button
            className={`${styles.hamburgerMenu} focus:outline-none`}
            onClick={openMenuSidebar}
            name="menu"
          >
            <MenuIcon width="24" />
          </button>
          <div
            className={`${styles.menuLinksContainer} flex space-x-8 uppercase justify-self-center font-semibold`}
          >
            <Link href="/">
              <a className={`${pathname == "/" ? "navBorder" : ""}`}>Home</a>
            </Link>
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
            <Link href={{ pathname: "/products", query: { categoryId: 24 } }}>
              <a
                className={`${
                  query?.categoryId == 24 ? "navBorder" : ""
                } text-red-500`}
              >
                Sale
              </a>
            </Link>
          </div>
        </div>
        <div className={`${styles.actions} flex space-x-4 justify-self-end`}>
          <div className={styles.searchbarContainer}>
            <Searchbar />
          </div>
          <div className="flex align-center space-x-2 sm:space-x-4">
            <HeartIcon width="24" className="cursor-pointer hidden sm:block" />
            <UserIcon width="24" className="cursor-pointer hidden sm:block" />
            <CartIcon
              width="24"
              onClick={openCartSidebar}
              className="cursor-pointer"
            />
          </div>
        </div>
      </nav>
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
    </header>
  );
};

export default Navbar;
