import { BiChevronDown, BiChevronRight, BiChevronUp } from "react-icons/bi";
import { UserCityData } from "../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";

type Props = {
  data: UserCityData;
  index: number;
};
const NavbarSubItem = ({ data, index, handleDeleteCity }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const selectedIndex =
    window.localStorage.getItem("weatherAppSelectedNavItemIndex") ?? 0;

  useEffect(() => {
    if (index === +selectedIndex) {
      setIsSelected(true);
      navigate(`/city/${data.name.toLocaleLowerCase()}`);
    } else {
      setIsSelected(false);
    }
  }, [selectedIndex]);

  return (
    <div className={`px-3 pb-3 ${isSelected ? "bg-gray-700" : ""}`}>
      <div className="flex justify-end items-center">
        <button
          onClick={() => handleDeleteCity(data._id)}
          className="
              text-rose-500 hover:text-rose-400 hover:scale-125"
        >
          <MdOutlineDeleteForever />
        </button>
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="
              text-indigo-200 hover:text-indigo-100 hover:scale-125"
        >
          {expanded ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
        </button>
        <button
          disabled={isSelected}
          className="text-indigo-200 hover:text-indigo-100 hover:scale-125"
          onClick={() => {
            window.localStorage.setItem(
              "weatherAppSelectedNavItemIndex",
              `${index}`
            );
            navigate(`/city/${data.name}`.toLocaleLowerCase());
          }}
        >
          <BiChevronRight size={20} />
        </button>
      </div>
      <div>
        <div className={`${isSelected ? "text-gray-100" : "text-gray-100"} `}>
          {data.isLocation ? <p>My Location</p> : null}
          <p>{data.name}</p>
        </div>
        <div
          className={`overflow-hidden transition-all ${
            isSelected ? "text-gray-400" : "text-gray-400"
          } ${expanded ? "h-14" : "h-0"}`}
        >
          <p>{data.description}</p>
          <p>{Math.round(data.mainTemp)}°</p>
          <p>
            H: <span>{Math.round(data.maxTemp)}°</span> L:{" "}
            <span>{Math.round(data.minTemp)}°</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarSubItem;
