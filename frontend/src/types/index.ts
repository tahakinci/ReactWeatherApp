export interface Forecast {
  cod: string;
  list: List[];
  city: City;
}

export interface ListBase {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: {
    all: number;
  };
  wind: Wind;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ListWithRain extends ListBase {
  rain: Rain;
}

export interface ListWithSnow extends ListBase {
  snow: Snow;
}

export type List = ListBase | ListWithRain | ListWithSnow;

export interface City {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  "3h": number;
}

interface Snow {
  "3h": number;
}

export enum DaysOfWeek {
  "Sunday" = 0,
  "Monday" = 1,
  "Tuesday" = 2,
  "Wednesday" = 3,
  "Thursday" = 4,
  "Friday" = 5,
  "Saturday" = 6,
}

export interface UserCityData {
  name: string;
  mainTemp: number;
  maxTemp: number;
  minTemp: number;
  description: string;
  timezone: number;
  isLocation: boolean;
}

export interface User {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

export interface LoggedInUser {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  cities: UserCityData[];
}

export type UserWithoutPassword = Omit<User, "password">;

export interface Notification {
  status: "error" | "success";
  message: string;
}
