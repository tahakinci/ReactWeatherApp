import WeeklyForecast from "./WeeklyForecast";
import WeatherTab from "./WeatherTab";
import Navbar from "./Navbar";
import OtherCities from "./OtherCities";
import { useState } from "react";
import iconObj from "../../constants/iconObj";
import {
  CityAPIRes,
  ListAPIRes,
  OtherCitiesAPIRes,
} from "../../WeatherAPIResponseTypes";
import { useWeatherData } from "../../useWeatherData";
import { HandleSearch } from "../SearchParams";

export type MobileandDesktopPropsType = {
  handleSearch: HandleSearch;
  handleUnit: (arg: string | undefined) => void;
  otherCityData: OtherCitiesAPIRes[];
  city: CityAPIRes;
  list: ListAPIRes[];
  windowSize?: number;
  unit: string;
};

const Mobile = ({
  list = [],
  city,
  otherCityData,
  windowSize,
  unit,
  handleSearch,
  handleUnit,
}: MobileandDesktopPropsType) => {
  const [mode, setMode] = useState({
    home: true,
    search: false,
    forecast: false,
    darkMode: true,
  });

  const TODO = (value: {
    home: boolean;
    search: boolean;
    forecast: boolean;
    darkMode: boolean;
  }) => {
    setMode(value);
  };

  const [today, otherDays] = useWeatherData(list);

  return (
    <div
      className={`flex h-full max-w-[500px]  flex-col justify-around overflow-hidden p-3 ${
        windowSize ? (windowSize > 500 ? "border-2" : null) : null
      }`}
    >
      {mode.home ? (
        <WeatherTab
          todayWeather={today}
          city={[city?.country, city?.name]}
          icon={iconObj[list[0]?.weather[0]?.icon]}
          unit={unit}
          handleUnit={handleUnit}
        />
      ) : mode.search ? (
        <OtherCities
          data={otherCityData}
          handleSearch={handleSearch}
          unit={unit}
        />
      ) : (
        <WeeklyForecast
          todayWeather={today}
          weeklyWeather={otherDays}
          unit={unit}
        />
      )}

      <Navbar TODO={TODO} />
    </div>
  );
};

export default Mobile;
