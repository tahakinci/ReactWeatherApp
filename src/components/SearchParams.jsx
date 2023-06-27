import Mobile from "./mobile/Mobile";
import Desktop from "./desktop/Desktop";
import { useState, useEffect } from "react";
import useWeatherData from "../constants/useWeatherData";
import { useQuery } from "@tanstack/react-query";
import fetchCities from "../constants/fetchCities";
const SearchParams = ({ coord }) => {
  const [city, setCity] = useState([]);
  const [mode, setMode] = useState(true);
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

  const toggleDevice = () => {
    const element = document.getElementById("root");
    if (mode) {
      setMode(false);
      element.style.maxWidth = "1520px";
    } else {
      element.style.maxWidth = "425px";
      setMode(true);
    }
  };

  return (
    <div
      id="deneme"
      className="w-full rounded-[2rem] bg-black font-['Oxanium'] text-white"
    >
      <button onClick={() => toggleDevice()}>Click me</button>
      {mode ? (
        <Mobile
          {...weatherData}
          handleSearch={handleSearch}
          otherCityData={otherCityData}
        />
      ) : (
        <Desktop
          {...weatherData}
          handleSearch={handleSearch}
          otherCityData={otherCityData}
        />
      )}
    </div>
  );
};

export default SearchParams;
