import axios from "axios";
import { Forecast } from "../types";

const key = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";

const getAll = async () => {
  const res = await axios.get<Forecast>(`${baseUrl}&appid=${key}`);
  return res.data;
};

const getCity = async (city: string): Promise<Forecast> => {
  const res = await axios.get<Forecast>(
    `${baseUrl}?q=${city}&appid=${key}&units=metric`
  );
  return res.data;
};

export default { getAll, getCity };
