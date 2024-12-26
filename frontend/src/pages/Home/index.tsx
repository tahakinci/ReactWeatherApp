import { useState } from "react";
import SearchInput from "../../components/SearchInput";
import Forecast from "./Forecast";
import { splitWeatherByDate } from "../../utils/converters";
import { setWeather } from "../../reducers/weatherReducer";
import weatherService from "../../services/weather";
import { useQuery } from "react-query";
import WeatherMetrics from "./WeatherMetrics";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Home = () => {
  const [city, setCity] = useState("");
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.weather);
  const { isLoading } = useQuery(
    ["weatherData", city],
    () => weatherService.getCity(city),
    {
      enabled: !!city,
      onSuccess: (data) => {
        dispatch(setWeather(data));
      },
    }
  );

  const handleSearch = (search: string) => {
    setCity(search);
  };

  if (isLoading) return "Loading...";

  return (
    <div className="px-[15vw]">
      <div id="header">
        <SearchInput onSubmit={handleSearch} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {weatherData && (
          <Forecast splitedWeatherData={splitWeatherByDate(weatherData)} />
        )}
        <div>
          <h3>Other cities</h3>
        </div>
        <WeatherMetrics cityData={weatherData.city} />
      </div>
    </div>
  );
};

export default Home;
