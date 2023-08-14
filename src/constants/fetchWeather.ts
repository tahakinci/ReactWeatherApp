import { QueryFunction } from "@tanstack/react-query";
import { ForecastAPIRes } from "../WeatherAPIResponseTypes";

export interface fetchWeatherInput {
  query?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

const API_KEY = import.meta.env.REACT_APP_API_KEY;

const fetchWeather: QueryFunction<
  ForecastAPIRes,
  ["city", fetchWeatherInput | undefined]
> = async ({ queryKey }) => {
  const search = queryKey[1];

  if (!search) {
    throw new Error("Missing search parameter");
  }

  // i'm fecthing user's coordinate using navigator.geolocation
  // this fuction gives me lat, and lon array but i also get city name from users when they submited
  // so the search parameter can be string or array
  let baseUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric`;
  // if search parameter  is string adding url to "q=" and search
  if (search.query) {
    baseUrl += `&q=${search.query}`;
    // if its array adding lat long and items of array
  } else if (search.coordinates) {
    baseUrl += `&lat=${search.coordinates.lat}&lon=${search.coordinates.lon}`;
  }
  const apiRes = await fetch(baseUrl);
  if (!apiRes.ok) {
    throw new Error(`Weather API ${search} is not ok!`);
  }

  return apiRes.json();
};

export default fetchWeather;
