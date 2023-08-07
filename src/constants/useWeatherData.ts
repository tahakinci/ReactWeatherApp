import { useQuery } from "@tanstack/react-query";
import fetchWeather, { fetchWeatherInput } from "./fetchWeather";

export default function useWeatherData(input: fetchWeatherInput | undefined) {
  if (!input) {
    return;
  }
  const results = useQuery(["city", input], fetchWeather);
  return results.data;
}
