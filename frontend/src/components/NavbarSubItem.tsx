import { BiChevronDown, BiChevronRight, BiChevronUp } from "react-icons/bi";
import { UserCityData } from "../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  data: UserCityData;
  index: number;
};
const NavbarSubItem = ({ data, index }: Props) => {
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
    <div className={`${isSelected ? "bg-red-500" : ""}`}>
      <div className="text-right">
        <button onClick={() => setExpanded((curr) => !curr)}>
          {expanded ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
        </button>
        <button
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
        <div>
          {data.isLocation ? <p>My Location</p> : null}
          <p>{data.name}</p>
        </div>
        <div
          className={`overflow-hidden transition-all ${
            expanded ? "h-14" : "h-0"
          }`}
        >
          <p>{data.description}</p>
          <p>{data.mainTemp}</p>
          <p>
            H: <span>{data.maxTemp}</span> L: <span>{data.minTemp}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarSubItem;
