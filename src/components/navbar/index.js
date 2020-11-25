import Link from "next/link";

const Navbar = (props) => {
  // console.log("pages", props);
  return (
    <nav className="">
      {props?.pages.map((page) => (
        <Link key={page.id} href={page.url}>
          <a className="px-4 py-2 uppercase">{page.name}</a>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
