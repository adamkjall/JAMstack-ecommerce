import Link from "next/link";

import Logo from "../../../public/icons/fox-icon.svg";
import CartIcon from "../../../public/icons/cart.svg";
import UserIcon from "../../../public/icons/user.svg";
import HeartIcon from "../../../public/icons/heart.svg";

import Searchbar from "components/searchbar";

import { useUI } from "contexts/ui/context";

const Navbar = () => {
  const { openSidebar } = useUI();

  return (
    <header className="fixed z-50 w-full bg-white shadow-md">
      <nav className="container mx-auto py-3 px-6 grid grid-cols-3 items-center">
        <Link href="/">
          <a className="cursor-pointer">
            <Logo width="50" />
          </a>
        </Link>
        <div className="flex space-x-8 uppercase justify-self-center">
          <Link href="/products&categoryId=19">
            <a className="cursor-pointer">Women</a>
          </Link>
          <Link href="/products&categoryId=18">
            <a className="cursor-pointer">Men</a>
          </Link>
          {/*  TODO go to sale */}
          <Link href="/products">
            <a className="cursor-pointer">Sale</a>
          </Link>
        </div>
        <div className="flex space-x-4 justify-self-end">
          <Searchbar />
          <div className="flex align-center space-x-4">
            <HeartIcon width="24" className="cursor-pointer" />
            <UserIcon width="24" className="cursor-pointer" />
            <CartIcon
              width="24"
              onClick={openSidebar}
              className="cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
