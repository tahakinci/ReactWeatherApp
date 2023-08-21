import { QueryFunction } from "@tanstack/react-query";
import { FetchCities } from "../WeatherAPIResponseTypes";

const API_KEY = import.meta.env.REACT_APP_API_KEY;
const fetchCities: QueryFunction<
  FetchCities,
  ["otherCities", number[], "metric" | "imperal"]
> = async ({ queryKey }) => {
  const id = queryKey[1];
  const unit = queryKey[2];
  const cityIdString = id.join(",");
  const apiUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityIdString}&appid=${API_KEY}&units=${unit}`;

  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error("Network response is not ok");
  }
  return res.json();
};

export default fetchCities;
