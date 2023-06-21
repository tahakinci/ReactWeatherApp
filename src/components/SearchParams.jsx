import Mobile from "./Mobile";
import Desktop from "./Desktop";
import { useState, useEffect } from "react";
import useWeatherData from "../constants/useWeatherData";
import { useQuery } from "@tanstack/react-query";
import fetchCities from "../constants/fetchCities";
const SearchParams = ({ coord }) => {
  const [city, setCity] = useState([]);
  const citiesID = [2988507, 2643743, 3173435, 5391959];
  //coord contains user coordinate. before user input any city useWeatherDayta fetches users coordinate weather
  //TODO : find a way to make city state's initial value to coord without using useEffect!
  useEffect(() => setCity(coord), [coord]);
  //fetching data with TanstackQuery
  const weatherData = useWeatherData(city);
  //fetching other cities
  const fechedCityData = useQuery(["otherCities", citiesID], fetchCities);
  const otherCityData = fechedCityData?.data?.list ?? [];

  const handleSearch = (value) => {
    setCity(value);
  };

  return (
    <div>
      <Mobile
        {...weatherData}
        handleSearch={handleSearch}
        otherCityData={otherCityData}
      />
      {/* <Desktop /> */}
    </div>
  );
};

export default SearchParams;
