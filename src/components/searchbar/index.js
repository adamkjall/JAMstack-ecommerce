import { useState } from "react";
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
    <div className="relative mx-auto text-gray-600">
      <input
        className="border-2 border-gray-400 h-9 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className="absolute right-0 top-0 mt-2 mr-4"
        onClick={search}
      >
        <SearchIcon width="22" />
      </button>
    </div>
  );
};

export default Searchbar;
