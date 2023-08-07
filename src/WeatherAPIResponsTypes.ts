export type ForecastAPIRes = {
  city: CityAPIRes;
  list: ListAPIRes[];
};

export type CityAPIRes = {
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
};

export type ListAPIRes = {
  dt: number;
  dt_txt: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    [k: number]: {
      description: string;
      icon: string;
      id: number;
      main: string;
    };
  };
  wind: {
    deg?: number;
    speed: number;
  };
};

export type OtherCitiesAPIRes = {
  [k: number]: {
    dt: number;
    id: number;
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    name: number;
    sys: { [k: string]: number };
    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    };
    wind: {
      deg?: number;
      speed: number;
    };
  };
};
