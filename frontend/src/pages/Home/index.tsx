import { useEffect, useState } from "react";
import Forecast from "./Forecast";
import { splitWeatherByDate } from "../../utils/converters";
import { setWeather } from "../../reducers/weatherReducer";
import weatherService from "../../services/weather";
import usersService from "../../services/users";
import { useQuery } from "react-query";
import WeatherMetrics from "./WeatherMetrics";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { UserCityData } from "../../types";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import NavbarItem from "../../components/NavbarItem";
import { CiSettings } from "react-icons/ci";
import NavbarSubItem from "../../components/NavbarSubItem";
import { MdFormatListBulleted } from "react-icons/md";

const Home = () => {
  const { cityName } = useParams();
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.weather);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    cityName
  );
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (cityName) {
      setSelectedCity(cityName);
    }
  }, [cityName]);

  const { isLoading } = useQuery(
    ["weatherData", selectedCity],
    () => weatherService.getCity(selectedCity),
    {
      enabled: !!selectedCity,
      onSuccess: (data) => dispatch(setWeather(data)),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  //#region user location options

  async function success(position) {
    try {
      const res = await weatherService.getCity([
        position.coords.latitude,
        position.coords.longitude,
      ]);
      const citiesArr = user.data?.cities.filter(
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
      const updatedCity = await usersService.updateCities(
        data.id,
        locationCityData
      );
    } catch (error) {}
  }

  function error() {
    console.log(error);
  }

  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 60000 * 60,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  //#endregion

  if (isLoading) return "Loading...";

  return (
    <div className="flex sm:flex-row  flex-col-reverse h-screen overflow-hidden bg-yellow-300">
      <Navbar selectedCity={selectedCity}>
        <NavbarItem
          icon={<MdFormatListBulleted size={20} />}
          text="Cities"
          className="overflow-y-auto"
        >
          {user.cities.map((city, index) => {
            return (
              <li key={city.name} className="py-1 text-sm text-gray-500">
                <NavbarSubItem data={city} index={index} />
              </li>
            );
          })}
        </NavbarItem>
        <hr className="my-3" />
        <NavbarItem icon={<CiSettings size={20} />} text="Settings" />
      </Navbar>
      <div className="mx-10 grid grid-cols-1 sm:grid-cols-3 overflow-y-auto bg-blue-300">
        {weatherData && (
          <Forecast splitedWeatherData={splitWeatherByDate(weatherData)} />
        )}
        <WeatherMetrics cityData={weatherData.city} />
      </div>
    </div>
  );
};

export default Home;
