import SearchButton from "../SearchButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { CityAPIRes } from "../../WeatherAPIResponseTypes";
import { HandleSearch } from "../SearchParams";
import { DarkModeToggleButton } from "../../DarkModeToggleButton";

type DesktopNavbarPropsType = {
  city: CityAPIRes;
  handleSearch: HandleSearch;
  handleUnit: (arg: string) => void;
};

const DesktopNavbar = ({
  handleSearch,
  city,
  handleUnit,
}: DesktopNavbarPropsType) => {
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
      <div className="flex gap-5">
        <div>
          <select
            className="text-black"
            onChange={(e) => handleUnit(e.target.value)}
          >
            <option value="metric">metric</option>
            <option value="imperial">imperial</option>
          </select>
        </div>
        <DarkModeToggleButton />
      </div>
    </div>
  );
};

export default DesktopNavbar;
