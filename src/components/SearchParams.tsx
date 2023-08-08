import Mobile from "./mobile/Mobile";
import Desktop from "./desktop/Desktop";
import { useState, useEffect, useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchCities from "../constants/fetchCities";
import SearchButton from "./SearchButton";
import fetchWeather, { fetchWeatherInput } from "../constants/fetchWeather";

export type HandleSearch = (value: string) => void;

const SearchParams = ({ coord }: { coord: number[] }) => {
  const [city, setCity] = useState<fetchWeatherInput>();
  const [mode, setMode] = useState(true);
  const [windowSize, setWindowSize] = useState(0);
  const citiesID = [2988507, 2643743, 3173435, 3117735];

  //coord contains user coordinate. before user input any city useWeatherDayta fetches users coordinate weather
  //TODO : find a way to make city state's initial value to coord without using useEffect!

  useEffect(() => {
    if (coord.length) {
      setCity({
        coordinates: {
          lat: coord[0],
          lon: coord[1],
        },
      });
    }
  }, [coord]);
  //fetching data with TanstackQuery
  const fetchedWeather = useQuery(["city", city], fetchWeather);
  const weatherData = fetchedWeather.data;

  //fetching other cities
  const fechedCityData = useQuery(["otherCities", citiesID], fetchCities);
  const otherCityData = fechedCityData.data?.list ?? [];

  const handleSearch: HandleSearch = (value) => {
    setCity({
      query: value,
    });
  };

  const toggleDevice = () => {
    const element = document.getElementById("root");
    if (mode) {
      if (element) {
        setMode(false);
        element.style.maxWidth = "1600px";
      }
    } else {
      if (element) {
        element.style.maxWidth = "425px";
        setMode(true);
      }
    }
  };

  useLayoutEffect(() => {
    function updateSize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!city) {
    return (
      <div className=" flex h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 from-5% to-slate-900 to-20% font-['Oxanium'] text-white">
        <div className="w-[50%]">
          <p className="center">
            You probably didnt share your location with us or something went
            wrong
          </p>
          <p className="center">Please enter the city you want to search</p>
          <SearchButton handleSearch={handleSearch} />
        </div>
      </div>
    );
  }

  return (
    <div
      id="deneme"
      className=" w-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 from-5%  to-slate-900 to-20% font-['Oxanium'] text-white"
    >
      <button onClick={() => toggleDevice()} className="absolute">
        Click me
      </button>
      {windowSize < 500 || mode ? (
        <div className="h-[100vh]">
          <Mobile
            {...weatherData}
            handleSearch={handleSearch}
            otherCityData={otherCityData}
          />
        </div>
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
