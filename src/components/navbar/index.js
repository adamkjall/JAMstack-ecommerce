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
    <nav className="flex py-4 justify-between items-center">
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
        <CartIcon width="24" onClick={openSidebar} className="cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
