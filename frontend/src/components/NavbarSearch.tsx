import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { Forecast } from "../types";

type Props = {
  data: Forecast;
};

const NavbarSearch = ({ data, handleSaveCity }: Props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="py-1 text-sm text-gray-500 ml-4 border-l border-gray-300 sm:block hidden pl-3">
      <div className="text-right">
        <button onClick={() => setExpanded((curr) => !curr)}>
          {expanded ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
        </button>
        <button onClick={handleSaveCity}>
          <IoAdd size={20} />
        </button>
      </div>
      <div>
        <div>
          <p>{data.city.name}</p>
        </div>
        <div
          className={`overflow-hidden transition-all ${
            expanded ? "h-14" : "h-0"
          }`}
        >
          <p>{data.list[0].weather[0].description}</p>
          <p>{data.list[0].main.temp}</p>
          <p>
            H: <span>{data.list[0].main.temp_max}</span> L:{" "}
            <span>{data.list[0].main.temp_min}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarSearch;
