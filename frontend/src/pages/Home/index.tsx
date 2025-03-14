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
import { updateUser } from "../../reducers/userReducer";

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

  const handleDeleteCity = async (id: string) => {
    try {
      const cities = user.cities.filter((c) => c._id !== id);
      const updatedUser = await usersService.updateCities(user.id, cities);
      dispatch(
        updateUser({
          ...user,
          cities: cities,
        })
      );
      window.localStorage.setItem(
        "loggedWeatherAppUser",
        JSON.stringify({ ...user, cities: updatedUser.cities })
      );
    } catch (error) {
      // TODO
    }
  };

  if (isLoading) return "Loading...";

  return (
    <div>
      <div className="flex sm:flex-row absolute flex-col-reverse h-screen overflow-hidden bg-transparent">
        <Navbar selectedCity={selectedCity}>
          <NavbarItem
            icon={<MdFormatListBulleted size={20} />}
            text="Cities"
            className="overflow-y-auto"
          >
            {user.cities.map((city, index) => {
              return (
                <li key={city.name} className="py-1 text-sm text-gray-500">
                  <NavbarSubItem
                    data={city}
                    index={index}
                    handleDeleteCity={handleDeleteCity}
                  />
                </li>
              );
            })}
          </NavbarItem>
          <NavbarItem icon={<CiSettings size={20} />} text="Settings" />
        </Navbar>
        <div className="mx-10 grid grid-cols-1 sm:grid-cols-3 overflow-y-auto bg-transparent">
          {weatherData.city && (
            <>
              <div className="col-span-full text-2xl flex flex-col items-center m-auto py-16 text-white">
                <h2>{weatherData.city.name}</h2>
                <h2 className="text-4xl">
                  {Math.round(weatherData.list[0].main.temp)}°
                </h2>
                <h2>{weatherData.list[0].weather[0].description}</h2>
                <div className="flex gap-2">
                  <h2>H: {Math.round(weatherData.list[0].main.temp_max)}°</h2>
                  <h2>L: {Math.round(weatherData.list[0].main.temp_min)}°</h2>
                </div>
              </div>
              <Forecast splitedWeatherData={splitWeatherByDate(weatherData)} />
            </>
          )}
          <WeatherMetrics cityData={weatherData.city} />
        </div>
      </div>
    </div>
  );
};

export default Home;
