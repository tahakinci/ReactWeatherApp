import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { HandleSearch } from "./SearchParams";

const SearchButton = ({ handleSearch }: { handleSearch: HandleSearch }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(search);
        }}
        className="w-full
         rounded-xl border-none bg-sky-300 p-3 dark:bg-[#222248]"
      >
        <button type="submit" className="px-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>

        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="mx-3 w-[70%] bg-transparent"
        />
      </form>
    </>
  );
};

export default SearchButton;
