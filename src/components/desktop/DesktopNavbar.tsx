import SearchButton from "../SearchButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { CityAPIRes } from "../../WeatherAPIResponseTypes";
import { HandleSearch } from "../SearchParams";
import { DarkModeToggleButton } from "../../DarkModeToggleButton";

type DesktopNavbarPropsType = {
  city: CityAPIRes;
  handleSearch: HandleSearch;
};

const DesktopNavbar = ({ handleSearch, city }: DesktopNavbarPropsType) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <FontAwesomeIcon icon={faLocationDot} size="lg" />
        <p className="ml-2 inline text-base">
          <span className="font-semibold">{city?.name}</span>,{" "}
          <span className="text-gray-200 dark:text-gray-400">
            {city?.country}
          </span>
        </p>
      </div>
      <div className="min-w-[50%]">
        <SearchButton handleSearch={handleSearch} />
      </div>

      <DarkModeToggleButton />
    </div>
  );
};

export default DesktopNavbar;
