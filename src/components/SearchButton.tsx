import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { HandleSearch } from "./SearchParams";

const SearchButton = ({
  handleSearch,
  darkMode,
}: {
  handleSearch: HandleSearch;
  darkMode: boolean;
}) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(search);
        }}
        className={`${
          darkMode ? "bg-[#222248]" : "bg-sky-300"
        } w-full rounded-xl border-none p-3`}
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
