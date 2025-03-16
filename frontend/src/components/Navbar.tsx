import { useNavigate } from "react-router-dom";
import { Forecast, UserCityData } from "../types";
import SearchInput from "./SearchInput";
import weatherService from "../services/weather";
import usersService from "../services/users";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setWeather } from "../reducers/weatherReducer";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { NavbarContext } from "../context/navbarContext";
import { logout, updateUser } from "../reducers/userReducer";
import NavbarSearch from "./NavbarSearch";

type Props = {
  selectedCity: string;
};

const Navbar = ({ children, selectedCity }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const [searchedCity, setSearchedCity] = useState("");
  const [searchedCityData, setSearchedCityData] = useState<Forecast | null>(
    null
  );
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCity) return;
    if (selectedCity.toLocaleLowerCase() !== searchedCity.toLowerCase()) {
      setSearchedCityData(null);
      setSearchedCity("");
    }
  }, [selectedCity]);

  useQuery(
    ["weatherData", searchedCity],
    () => {
      weatherService.getCity(searchedCity);
    },
    {
      enabled: !!searchedCity,
      onSuccess: (data) => {
        navigate(`/city/${searchedCity.toLowerCase()}`);
        setSearchedCityData(data);
        dispatch(setWeather(data));
        window.localStorage.setItem("weatherAppSelectedNavItemIndex", "-1");
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

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

  const handleSearch = (city: string) => {
    setSearchedCity(city);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.setItem("loggedWeatherAppUser", "");
    navigate("/");
  };

  return (
    <aside className="sm:h-full h-10">
      <nav className="sm:h-full h-10 flex flex-col bg-slate-800 border-r border-gray-700 shadow-sm">
        <div className="p-4 pb-2 justify-between items-center sm:flex hidden">
          <SearchInput
            className={`${expanded ? "block" : "hidden"} mr-2`}
            onSubmit={handleSearch}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-indigo-200 hover:text-indigo-100 sm:block hidden"
          >
            {expanded ? <LuChevronFirst /> : <LuChevronLast />}
          </button>
        </div>

        {searchedCityData && expanded && (
          <div className="p-3 sm:block hidden">
            <NavbarSearch
              data={searchedCityData}
              handleSaveCity={handleSaveCity}
            />
          </div>
        )}

        <NavbarContext.Provider value={{ expanded }}>
          <ul className="flex-1 flex sm:overflow-auto sm:flex-col flex-row justify-between sm:justify-normal px-3">
            {children}
          </ul>
        </NavbarContext.Provider>
        <div className="border-t border-gray-700 p-3 sm:flex hidden">
          <img src="" alt="" className="w-10 h-10 rounded-md" />
          <div
            className={`overflow-hidden transition-all flex  justify-between items-center  ${
              expanded ? "w-full ml-3 " : "w-0"
            } `}
          >
            <div className="leading-4 ">
              <h2 className="font-semibold text-gray-200">John Doe</h2>
              <span className="subtext text-xs text-gray-400">
                johndoe@gmail.com
              </span>
            </div>
            <button
              className="bg-gray-600 p-2 rounded-md text-rose-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
