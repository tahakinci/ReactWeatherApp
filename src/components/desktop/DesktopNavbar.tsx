import SearchButton from "../SearchButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { CityAPIRes } from "../../WeatherAPIResponseTypes";
import { HandleSearch } from "../SearchParams";
import { DarkModeToggleButton } from "../../DarkModeToggleButton";

type DesktopNavbarPropsType = {
  city: CityAPIRes;
  handleSearch: HandleSearch;
  handleUnit: (arg: "metric" | "imperial") => void;
  isFailed: boolean;
};

const DesktopNavbar = ({
  handleSearch,
  city,
  handleUnit,
  isFailed,
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
        <SearchButton handleSearch={handleSearch} isFailed={isFailed} />
      </div>
      <div className="flex gap-5">
        <div className="relative inline-block text-white">
          <select
            className="appearance-none rounded-md border-none bg-transparent py-2 pl-3 pr-8 outline-none"
            onChange={(e) =>
              handleUnit(e.target.value as "metric" | "imperial")
            }
          >
            <option className="bg-gray-800" value="metric">
              Metric
            </option>
            <option className="bg-gray-800" value="imperial">
              Imperial
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <DarkModeToggleButton />
      </div>
    </div>
  );
};

export default DesktopNavbar;
