import SearchButton from "../SearchButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faDesktop,
  faSun,
  faMoon,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { CityAPIRes } from "../../WeatherAPIResponseTypes";
import { HandleSearch } from "../SearchParams";

type DesktopNavbarPropsType = {
  city: CityAPIRes;
  handleSearch: HandleSearch;
};

const DesktopNavbar = ({ handleSearch, city }: DesktopNavbarPropsType) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="rounded-[2rem] bg-[#222248] text-[2rem] md:text-[1rem]">
        <button className="border-non hidden h-[50px] w-[50px] cursor-pointer rounded-full bg-indigo-800 object-contain p-3 text-center lg:inline">
          <FontAwesomeIcon icon={faDesktop} size="lg" />
        </button>
        <button className="h-[50px] w-[50px] cursor-pointer rounded-full border-none  object-contain text-center">
          <FontAwesomeIcon icon={faMobile} size="lg" />
        </button>
      </div>
      <div>
        <FontAwesomeIcon icon={faLocationDot} size="lg" />
        <p className="ml-2 inline text-base">
          <span className="font-semibold">{city?.name}</span>,{" "}
          <span className="text-gray-400">{city?.country}</span>
        </p>
      </div>
      <div className="min-w-[50%]">
        <SearchButton handleSearch={handleSearch} />
      </div>
      <div className="rounded-[2rem] bg-[#222248] text-[2rem] md:text-[1rem]">
        <button className="h-[50px] w-[50px] cursor-pointer rounded-full border-none bg-indigo-800 object-contain text-center">
          <FontAwesomeIcon icon={faSun} size="lg" />
        </button>
        <button className="h-[50px] w-[50px] cursor-pointer rounded-full border-none  object-contain text-center">
          <FontAwesomeIcon icon={faMoon} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default DesktopNavbar;
