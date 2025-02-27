import axios from "axios";
import { Forecast } from "../types";

const key = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";

const getAll = async () => {
  const res = await axios.get<Forecast>(`${baseUrl}&appid=${key}`);
  return res.data;
};

async function getCity(city: string): Promise<Forecast>;
async function getCity(coords: [number, number]): Promise<Forecast>;

// Single Implementation
async function getCity(param: string | [number, number]): Promise<Forecast> {
  let url: string;

  if (typeof param === "string") {
    url = `${baseUrl}?q=${param}&appid=${key}&units=metric`;
  } else {
    const [lat, lon] = param;
    url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  }

  const res = await axios.get<Forecast>(url);
  return res.data;
}

export default { getAll, getCity };
