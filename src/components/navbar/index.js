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
      <nav className="container mx-auto py-3 px-4 flex justify-between items-center">
        <Link href="/">
          <a className="cursor-pointer">
            <Logo width="50" />
          </a>
        </Link>
        <div className="flex space-x-8 uppercase">
          <Link href="/products">
            <a className="cursor-pointer">Products</a>
          </Link>
          <Link href="/blog">
            <a className="cursor-pointer">Blog</a>
          </Link>
          <Link href="/about">
            <a className="cursor-pointer">About</a>
          </Link>
        </div>
        <div className="flex space-x-4">
          <Searchbar />
          <HeartIcon width="24" className="cursor-pointer" />
          <UserIcon width="24" className="cursor-pointer" />
          <CartIcon
            width="24"
            onClick={openSidebar}
            className="cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
