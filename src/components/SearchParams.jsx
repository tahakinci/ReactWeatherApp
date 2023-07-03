import Mobile from "./mobile/Mobile";
import Desktop from "./desktop/Desktop";
import { useState, useEffect } from "react";
import useWeatherData from "../constants/useWeatherData";
import { useQuery } from "@tanstack/react-query";
import fetchCities from "../constants/fetchCities";
const SearchParams = ({ coord }) => {
  const [city, setCity] = useState([]);
  const [mode, setMode] = useState(true);
  const citiesID = [2988507, 2643743, 3173435, 3117735];

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
      className="h-[100vh] w-full  bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 from-5%  to-slate-900 to-20% font-['Oxanium'] text-white"
    >
      <button onClick={() => toggleDevice()} className="absolute">
        Click me
      </button>
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
