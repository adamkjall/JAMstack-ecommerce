import { useEffect, useRef } from "react";
import Link from "next/link";

import { useUI } from "contexts/ui";

import CrossIcon from "../../../../public/icons/close.svg";

const NavSidebar = () => {
  const { displayMenuSidebar, closeMenuSidebar } = useUI();
  const ref = useRef();

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
        displayMenuSidebar ? "" : "translate-x-full"
      } fixed top-0 -left-full w-96 h-full transform ease-in-out transition-all duration-300 z-50 p-4 bg-white`}
    >
      <header className="mb-4">
        <button className="focus:outline-none" onClick={closeMenuSidebar}>
          <CrossIcon width="24" />
        </button>
      </header>
      <nav>
        <Link href={{ pathname: "/products " }}>
          <a>Women</a>
        </Link>
        <Link href={{ pathname: "/products " }}>
          <a>Men</a>
        </Link>
        <Link href={{ pathname: "/products " }}>
          <a>Sale</a>
        </Link>
      </nav>
    </aside>
  );
};

export default NavSidebar;
