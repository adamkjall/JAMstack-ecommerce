import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import SearchIcon from "../../../public/icons/search.svg";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function search() {
    if (query) {
      router.push({ pathname: "/products", query: { searchTerm: query } });
      setQuery("");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      search();
    }
  }

  return (
    <div className="flex">
      <input
        className="border-black border-b px-2"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <SearchIcon width="24" className="cursor-pointer" onClick={search} />
    </div>
  );
};

export default Searchbar;
