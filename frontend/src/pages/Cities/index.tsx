import SearchInput from "../../components/SearchInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
import usersService from "../../services/users";
import weatherService from "../../services/weather";
import City from "./City";
import { useEffect, useState } from "react";
import { Forecast } from "../../types";
import { updateUser } from "../../reducers/userReducer";
import { IoAdd } from "react-icons/io5";

const Cities = () => {
  const [searchedCity, setSearchedCity] = useState("");
  const [searchedCityData, setSearchedCityData] = useState<Forecast | null>(
    null
  );
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getSearchedCity();
  }, [searchedCity]);

  const getSearchedCity = async () => {
    if (!searchedCity) return;
    const res = await weatherService.getCity(searchedCity);
    setSearchedCityData(res);
  };

  const handleSaveCity = async () => {
    if (!searchedCityData) return;

    if (
      user.cities.some(
        (city) =>
          city.name.toLowerCase() === searchedCityData.city.name.toLowerCase()
      )
    ) {
      alert("This city is already saved.");
      return;
    }

    const cityObj: UserCityData = {
      name: searchedCityData.city.name,
      mainTemp: searchedCityData.list[0].main.temp,
      maxTemp: searchedCityData.list[0].main.temp_max,
      minTemp: searchedCityData.list[0].main.temp_min,
      description: searchedCityData.list[0].weather[0].description,
      timezone: searchedCityData.city.timezone,
      isLocation: false,
    };

    try {
      await usersService.addCity(user.id, cityObj);
      dispatch(updateUser({ ...user, cities: [...user.cities, cityObj] }));
      window.localStorage.setItem(
        "loggedWeatherAppUser",
        JSON.stringify({ ...user, cities: [...user.cities, cityObj] })
      );
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

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

  const handleSearch = (city: string) => {
    setSearchedCity(city);
  };
  return (
    <div className="sm:w-1/2 w-full m-auto p-4">
      <SearchInput onSubmit={handleSearch} className="pb-2" />
      {searchedCityData && (
        <div>
          <div className="text-right">
            <button onClick={handleSaveCity}>
              <IoAdd size={20} />
            </button>
          </div>
          <div className="p-4 border-2 border-black mb-2 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p>{searchedCityData.city.name}</p>
                <p>Saat gelecek</p>
              </div>
              <p>{searchedCityData.list[0].main.temp}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>{searchedCityData.list[0].weather[0].description}</p>
              <div>
                H: {searchedCityData.list[0].main.temp_max}{" "}
                <span>L: {searchedCityData.list[0].main.temp_min}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {}
      {user.cities.map((city, index) => (
        <City
          key={city.name}
          city={city}
          index={index}
          handleDeleteCity={handleDeleteCity}
        />
      ))}
    </div>
  );
};

export default Cities;
