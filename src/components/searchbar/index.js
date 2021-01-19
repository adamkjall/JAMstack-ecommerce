import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import SearchIcon from "../../../public/icons/search.svg";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   console.log("router changed");
  // }, [router]);

  function handleSearch() {
    if (query) {
      router.push({ pathname: "/products", query: { searchTerm: query } });
      setQuery("");
    }
  }

  return (
    <div className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchIcon
        width="24"
        className="cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Searchbar;
