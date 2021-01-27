import { useState } from "react";
import { useRouter } from "next/router";

import { useUI } from "contexts/ui";

import SearchIcon from "../../../public/icons/search.svg";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { closeMenuSidebar } = useUI();

  function search() {
    if (query) {
      router.push({ pathname: "/products", query: { searchTerm: query } });
      setQuery("");
      closeMenuSidebar();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      search();
    }
  }

  return (
    <div className="relative mx-auto text-gray-800">
      <label for="search hidden">Searchbox</label>
      <input
        id="search"
        className="border-b border-gray-700 h-9 w-40 px-3 pr-10  text-sm focus:outline-none"
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
