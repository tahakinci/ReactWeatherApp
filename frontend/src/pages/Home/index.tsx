import { useState } from "react";
import SearchInput from "../../components/SearchInput";
import { useFetchCityWeather } from "../../hooks/api";
import Forecast from "./Forecast";
import { splitWeatherByDate } from "../../utils/converters";

const Home = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (search: string) => {
    // dispatch(onSubmit(data));
    // valueyi storeye atmaya gerek var mı?
    setSearch(search);
  };

  const { weatherData } = useFetchCityWeather(search);

  return (
    <div>
      <div id="header">
        <SearchInput onSubmit={handleSearch} />
        {weatherData && (
          <Forecast
            splitedWeatherData={splitWeatherByDate(weatherData?.list)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
