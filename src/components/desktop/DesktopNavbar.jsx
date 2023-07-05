import SearchButton from "../SearchButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faDesktop,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

const DesktopNavbar = ({ handleSearch, city }) => {
  return (
    <div className="flex items-center justify-between p-4">
      <button className="hidden rounded-full bg-gray-500 p-3 lg:block">
        <FontAwesomeIcon icon={faDesktop} size="lg" />
      </button>
      <div>
        <FontAwesomeIcon icon={faLocationDot} size="lg" />
        <p className="ml-2 inline text-base">
          <span className="font-semibold">{city.name}</span>,{" "}
          <span className="text-gray-400">{city.country}</span>
        </p>
      </div>
      <div className="min-w-[50%]">
        <SearchButton handleSearch={handleSearch} />
      </div>
      <div className="rounded-[2rem] bg-gray-500 text-[2rem] md:text-[1rem]">
        <button className="h-[50px] w-[50px] cursor-pointer rounded-full border-none bg-blue-500 object-contain text-center">
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
