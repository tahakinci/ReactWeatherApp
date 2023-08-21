import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { HandleSearch } from "./SearchParams";

const SearchButton = ({
  handleSearch,
  isFailed,
}: {
  handleSearch: HandleSearch;
  isFailed: boolean;
}) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(search);
        }}
        className={`w-full
         rounded-xl  bg-sky-300 p-3 transition dark:bg-[#222248] ${
           isFailed ? "animate-shake border-2 border-red-500" : "border-none"
         }`}
      >
        <button type="submit" className="px-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>

        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="mx-3 w-[70%] bg-transparent outline-none"
        />
      </form>
    </>
  );
};

export default SearchButton;
