import Mobile from "./mobile/Mobile";
import Desktop from "./desktop/Desktop";
import { useState, useEffect, useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchCities from "../constants/fetchCities";
import SearchButton from "./SearchButton";
import fetchWeather, { fetchWeatherInput } from "../constants/fetchWeather";
import { ModeButton } from "../ModeButton";

export type HandleSearch = (value: string) => void;

const SearchParams = ({ coord }: { coord: number[] }) => {
  const [city, setCity] = useState<fetchWeatherInput>({});
  const [mode, setMode] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
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

  useLayoutEffect(() => {
    function updateSize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  //fetching weather data with TanstackQuery

  //   const queryKey =
  //   city && city.query
  //     ? ["city", city?.query]
  //     : ["coordinates", city?.coordinates];
  // const { data } = useQuery(queryKey, fetchWeather, {
  //   retry: false,
  // });
  // const weatherData = data;

  const { data } = useQuery(["city", city], fetchWeather, {
    retry: false,
  });
  const weatherData = data;

  //fetching other cities
  const fechedCityData = useQuery(["otherCities", citiesID], fetchCities);
  const otherCityData = fechedCityData.data?.list ?? [];

  const handleSearch: HandleSearch = (value) => {
    setCity({
      query: value,
    });
  };

  function toggleDeviceMode() {
    if (windowSize > 500 && !mode) {
      setMode(true);
    } else {
      setMode(false);
    }
  }

  function toggleThemeMode() {
    setDarkMode(() => !darkMode);
  }

  if (!weatherData) {
    return (
      <div className=" flex h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 from-5% to-slate-900 to-20% font-['Oxanium'] text-white">
        <div className="w-[50%]">
          <p className="center">
            You probably didnt share your location with us or something went
            wrong
          </p>
          <p className="center">Please enter the city you want to search</p>
          <SearchButton handleSearch={handleSearch} darkMode={darkMode} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        darkMode
          ? "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900  from-5% to-slate-900 to-20%"
          : "bg-blue-500"
      } w-full  font-['Oxanium'] text-white`}
    >
      {windowSize > 500 ? <ModeButton toggleDevice={toggleDeviceMode} /> : null}
      {!mode || windowSize < 500 ? (
        <div className="flex h-[100vh] items-center justify-center">
          <Mobile
            {...weatherData}
            handleSearch={handleSearch}
            otherCityData={otherCityData}
            windowSize={windowSize}
            darkMode={darkMode}
          />
        </div>
      ) : (
        <Desktop
          {...weatherData}
          handleSearch={handleSearch}
          otherCityData={otherCityData}
          darkMode={darkMode}
          toggleThemeMode={toggleThemeMode}
        />
      )}
    </div>
  );
};

export default SearchParams;
