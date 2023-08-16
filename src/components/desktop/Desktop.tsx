import iconObj from "../../constants/iconObj";
import Forecast from "./Forecast";
import Charts from "../Charts";
import Map from "../Map";
import OtherCitiesDesktop from "./OtherCitiesDesktop";
import DesktopNavbar from "./DesktopNavbar";
import { useWeatherData } from "../../useWeatherData";
import { MobileandDesktopPropsType } from "../mobile/Mobile";

const Desktop = ({
  list = [],
  city,
  handleSearch,
  otherCityData,
}: MobileandDesktopPropsType) => {
  const [today, otherDays] = useWeatherData(list);

  return (
    <div className="m-auto min-h-screen w-[85%] rounded-3xl">
      <DesktopNavbar city={city} handleSearch={handleSearch} />
      <div className="grid grid-cols-1 gap-5 px-6 lg:grid-cols-[3fr_1fr] ">
        <div>
          <h2 className="py-2 text-lg">Forecast</h2>
          <Forecast
            today={today}
            otherDays={otherDays}
            icon={iconObj[list[0]?.weather[0]?.icon]}
            city={city}
          />
        </div>
        <Charts weather={today} />
        <div className="max-h-[300px]">
          <h2 className="py-2 text-lg">Global Map </h2>
          {otherCityData.length ? (
            <Map data={otherCityData} />
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div>
          <h2 className="py-2 text-lg">Other Cities</h2>
          <div className="mr-2 max-h-[300px] overflow-y-scroll scrollbar-thin scrollbar-track-sky-300 scrollbar-thumb-amber-200 scrollbar-track-rounded scrollbar-thumb-rounded dark:scrollbar-track-[#222248] dark:scrollbar-thumb-indigo-900">
            {otherCityData.map((city) => (
              <OtherCitiesDesktop
                data={city}
                key={city.name}
                icon={iconObj[city?.weather[0]?.icon]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
