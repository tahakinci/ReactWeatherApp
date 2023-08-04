import { isError, useQuery } from "@tanstack/react-query";
import fetchWeather from "./fetchWeather";

export default function useWeatherData(city) {
    const results = useQuery(["city", city], fetchWeather)


    return results?.data ?? []
}