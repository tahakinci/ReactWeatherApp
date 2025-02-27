import { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import Forecast from "./Forecast";
import { splitWeatherByDate } from "../../utils/converters";
import { setWeather } from "../../reducers/weatherReducer";
import weatherService from "../../services/weather";
import usersService from "../../services/users";
import { useQuery } from "react-query";
import WeatherMetrics from "./WeatherMetrics";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { LoggedInUser, UserCityData } from "../../types";

type Props = {
  data: LoggedInUser | null;
};

const Home = ({ data }: Props) => {
  const [city, setCity] = useState("");
  const [isLocationAccessGranted, setIsLocationAccessGranted] = useState(true);
  const [selectedCity, setSelectedCity] = useState(data?.cities[0]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const weatherData = useAppSelector((state) => state.weather);

  const { isLoading } = useQuery(
    ["weatherData", city],
    () => weatherService.getCity(city),
    {
      enabled: !!city,
      onSuccess: (data) => {
        dispatch(setWeather(data));
      },
    }
  );

  //#region user location options

  async function success(position) {
    try {
      setIsLocationAccessGranted(true);
      const res = await weatherService.getCity([
        position.coords.latitude,
        position.coords.longitude,
      ]);
      const citiesArr = data?.cities.filter(
        (city) => city.isLocation === false
      );
      const locationCityData: UserCityData = {
        name: res.city.name,
        mainTemp: res.list[0].main.temp,
        maxTemp: res.list[0].main.temp_max,
        minTemp: res.list[0].main.temp_min,
        description: res.list[0].weather[0].description,
        timezone: res.city.timezone,
        isLocation: true,
      };
      const updatedCity = await usersService.updateCities(data.id, {
        ...data,
        cities: locationCityData,
      });
    } catch (error) {}
  }

  function error() {
    setIsLocationAccessGranted(false);
  }

  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 60000 * 60,
  };

  useEffect(() => {
    const watchID = navigator.geolocation.watchPosition(
      success,
      error,
      options
    );
  }, [isLocationAccessGranted]);

  //#endregion

  const handleSearch = (search: string) => {
    setCity(search);
  };

  if (isLoading) return "Loading...";

  return (
    <div className="px-[15vw]">
      <div id="header">
        <SearchInput onSubmit={handleSearch} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {weatherData && (
          <Forecast splitedWeatherData={splitWeatherByDate(weatherData)} />
        )}
        <WeatherMetrics cityData={weatherData.city} />
      </div>
    </div>
  );
};

export default Home;
