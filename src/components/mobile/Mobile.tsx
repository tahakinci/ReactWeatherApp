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
  list: ListAPIRes[];
  city: CityAPIRes;
  handleSearch: HandleSearch;
  otherCityData: OtherCitiesAPIRes[];
};

const Mobile = ({
  list = [],
  city,
  handleSearch,
  otherCityData,
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
    <div className="flex h-full flex-col  justify-around overflow-hidden p-3">
      {mode.home ? (
        <WeatherTab
          todayWeather={today}
          city={[city?.country, city?.name]}
          icon={iconObj[list[0]?.weather[0]?.icon]}
        />
      ) : mode.search ? (
        <OtherCities data={otherCityData} handleSearch={handleSearch} />
      ) : (
        <WeeklyForecast todayWeather={today} weeklyWeather={otherDays} />
      )}

      <Navbar TODO={TODO} />
    </div>
  );
};

export default Mobile;
