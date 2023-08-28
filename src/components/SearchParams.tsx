import Mobile from "./mobile/Mobile";
import Desktop from "./desktop/Desktop";
import { useState, useEffect, useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchCities from "../utils/api/fetchCities";
import SearchButton from "./SearchButton";
import fetchWeather, { fetchWeatherInput } from "../utils/api/fetchWeather";
import { ModeButton } from "./ModeButton";

export type HandleSearch = (value: string) => void;

const SearchParams = ({ coord }: { coord: number[] }) => {
  const [city, setCity] = useState<fetchWeatherInput>({});
  const [mode, setMode] = useState(true);
  const [windowSize, setWindowSize] = useState(0);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isFailed, setIsFailed] = useState(false);

  const citiesID = [2988507, 2643743, 3173435, 3117735];
  //coord contains user coordinate. before user input any city useWeatherData fetches users coordinate weather

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

  const { data: newWeatherData, isSuccess } = useQuery({
    queryKey: ["city", city, unit],
    queryFn: fetchWeather,
    retry: false,
  });
  const [weatherData, setWeatherData] = useState(newWeatherData);

  // Update weatherData only if there's no error

  useEffect(() => {
    if (isSuccess) {
      setWeatherData(newWeatherData);
      setIsFailed(false);
    } else {
      setIsFailed(true);
    }
  }, [newWeatherData]);

  //fetching other cities
  const fechedCityData = useQuery({
    queryKey: ["otherCities", citiesID, unit],
    queryFn: fetchCities,
  });
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

  function handleUnit(value: "metric" | "imperial") {
    setUnit(value);
  }

  if (!weatherData) {
    return (
      <div
        className=" flex h-screen w-full items-center justify-center bg-sky-500 font-['Oxanium'] text-white
      dark:bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))]  dark:from-indigo-900 dark:from-5% dark:to-slate-900 dark:to-20%"
      >
        <div className="w-[75%] sm:w-[50%]">
          <div className="pb-4">
            <p className="hidden text-center sm:block">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              You haven't granted permission to access your location or
              something went wrong.
            </p>
            <p className="text-center">
              Please enter the city you want to search
            </p>
          </div>
          <SearchButton handleSearch={handleSearch} isFailed={isFailed} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-sky-500 font-['Oxanium'] text-white dark:bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))]
       dark:from-indigo-900  dark:from-5% dark:to-slate-900 dark:to-20%"
    >
      {windowSize > 500 ? <ModeButton toggleDevice={toggleDeviceMode} /> : null}
      {!mode || windowSize < 500 ? (
        <div className="flex h-[100vh] items-center justify-center">
          <Mobile
            {...weatherData}
            handleSearch={handleSearch}
            otherCityData={otherCityData}
            windowSize={windowSize}
            handleUnit={handleUnit}
            unit={unit}
            isFailed={isFailed}
          />
        </div>
      ) : (
        <Desktop
          {...weatherData}
          handleSearch={handleSearch}
          otherCityData={otherCityData}
          handleUnit={handleUnit}
          unit={unit}
          isFailed={isFailed}
        />
      )}
    </div>
  );
};

export default SearchParams;
