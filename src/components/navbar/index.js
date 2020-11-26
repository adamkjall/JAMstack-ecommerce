import Link from "next/link";

import Logo from "../../../public/icons/logo.svg";
import CartIcon from "../../../public/icons/cart.svg";
import UserIcon from "../../../public/icons/user.svg";
import HeartIcon from "../../../public/icons/heart.svg";
import SearchIcon from "../../../public/icons/search.svg";

import { useUI } from "contexts/ui/context";

const Navbar = () => {
  const { openSidebar } = useUI();

  return (
    <nav className="flex py-4 justify-between items-center">
      <Link href="/">
        <a>
          <Logo width="100" />
        </a>
      </Link>
      <div className="flex space-x-8 uppercase">
        <Link href="/products/">
          <a className="">Produkter</a>
        </Link>
        <Link href="/blog/">
          <a className="">Blog</a>
        </Link>
        <Link href="/about/">
          <a className="">Om oss</a>
        </Link>
      </div>
      <div className="flex space-x-4">
        <SearchIcon width="24" />
        <HeartIcon width="24" />
        <UserIcon width="24" />
        <CartIcon width="24" onClick={openSidebar} />
      </div>
    </nav>
  );
};

export default Navbar;
