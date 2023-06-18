import Mobile from "./Mobile";
import Desktop from "./Desktop";
import { useState, useEffect } from "react";
import useWeatherData from "../constants/useWeatherData";
const SearchParams = ({ coord }) => {
  const [city, setCity] = useState([]);
  //coord contains user coordinate. before user input any city useWeatherDayta fetches users coordinate weather
  //TODO : find a way to make city state's initial value to coord without using useEffect!
  useEffect(() => setCity(coord), [coord]);
  //fetching data with TanstackQuery
  const weatherData = useWeatherData(city);

  const handleSearch = (value) => {
    setCity(value);
  };
  return (
    <div>
      <Mobile {...weatherData} handleSearch={handleSearch} />
      {/* <Desktop /> */}
    </div>
  );
};

export default SearchParams;
