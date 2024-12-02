import { useState } from "react";
import SearchInput from "../../components/SearchInput";
import { useFetchCityWeather } from "../../hooks/api";
import Forecast from "./Forecast";
import { splitWeatherByDate } from "../../utils/converters";
import { useDispatch, useSelector } from "react-redux";
import { setWeather } from "../../reducers/weatherReducer";
import weatherService from "../../services/weather";
import { useQuery } from "react-query";

const Home = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather);

  const { isLoading } = useQuery(
    ["weatherData", city],
    () => weatherService.getCity(city),
    {
      enabled: !!city,
      onSuccess: (data) => {
        const convertedData = splitWeatherByDate(data.list);
        dispatch(setWeather(convertedData));
      },
    }
  );

  const handleSearch = (search: string) => {
    setCity(search);
  };

  if (isLoading) return "Loading...";

  return (
    <div>
      <div id="header">
        <SearchInput onSubmit={handleSearch} />
        {weatherData && <Forecast splitedWeatherData={weatherData} />}
      </div>
    </div>
  );
};

export default Home;
