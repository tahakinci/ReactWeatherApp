import { useState } from "react";

const SearchButton = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(search);
        }}
      >
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SearchButton;
