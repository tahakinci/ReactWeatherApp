import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchButton = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(search);
        }}
        className="w-full rounded-xl border-none bg-[#222248] p-3"
      >
        <button type="submit" className="px-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>

        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="mx-3 w-[75%] bg-transparent"
        />
      </form>
    </>
  );
};

export default SearchButton;
