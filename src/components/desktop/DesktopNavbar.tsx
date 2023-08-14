import SearchButton from "../SearchButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { CityAPIRes } from "../../WeatherAPIResponseTypes";
import { HandleSearch } from "../SearchParams";

type DesktopNavbarPropsType = {
  city: CityAPIRes;
  handleSearch: HandleSearch;
  darkMode: boolean;
  toggleThemeMode: () => void;
};

const DesktopNavbar = ({
  handleSearch,
  city,
  darkMode,
  toggleThemeMode,
}: DesktopNavbarPropsType) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <FontAwesomeIcon icon={faLocationDot} size="lg" />
        <p className="ml-2 inline text-base">
          <span className="font-semibold">{city?.name}</span>,{" "}
          <span className="text-gray-400">{city?.country}</span>
        </p>
      </div>
      <div className="min-w-[50%]">
        <SearchButton handleSearch={handleSearch} darkMode={darkMode} />
      </div>

      <input
        type="checkbox"
        id="darkmode-toggle"
        className="invisible h-0 w-0 checked:first:left-[490px] checked:first:translate-x-[-100%] checked:first:bg-gradient-to-b checked:first:from-[#777] checked:first:to-[#3a3a3a]"
      />
      <label
        htmlFor="darkmode-toggle"
        className={`relative h-[200px] w-[500px] cursor-pointer rounded-full bg-[#ebebeb] shadow-inner transition-[0.3] after:absolute after:left-[10px] after:top-[10px] after:h-[180px] after:w-[180px] after:rounded-full after:bg-gradient-to-b after:from-[#ffcc89] after:to-[#d9960f] after:shadow-sm after:transition-[0.3] after:content-[""]`}
      ></label>
      {/* <input
        className={`${
          darkMode ? "bg-[#222248]" : "bg-sky-300"
        } rounded-[2rem] py-3  text-[2rem] md:text-[1rem]`}
        onClick={() => toggleThemeMode()}
      >
        <span
          className={`${
            darkMode ? "bg-none" : "bg-yellow-300"
          } rounded-full object-contain p-4 text-center`}
        >
          <FontAwesomeIcon icon={faSun} size="lg" />
        </span>
        <span
          className={`${
            darkMode ? "bg-indigo-800" : "bg-none"
          } rounded-full  object-contain p-4 text-center`}
        >
          <FontAwesomeIcon icon={faMoon} size="lg" />
        </span>
      </input> */}
    </div>
  );
};

export default DesktopNavbar;
