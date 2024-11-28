import { useQuery } from "@tanstack/react-query";
import weatherService from "../services/weather";

export const useFetchCityWeather = (city: string) => {
  const { isLoading, data: weatherData } = useQuery({
    queryKey: ["weather"],
    queryFn: () => weatherService.getCity(city),
  });

  return { isLoading, weatherData };
};
