import React from "react";
import SearchButton from "../SearchButton";
import iconObj from "../../constants/iconObj";
import Map from "../Map";
import { OtherCitiesAPIRes } from "../../WeatherAPIResponseTypes";
import { HandleSearch } from "../SearchParams";

type OtherCitiesPropsType = {
  data: OtherCitiesAPIRes[];
  handleSearch: HandleSearch;
};

const OtherCities = ({ data, handleSearch }: OtherCitiesPropsType) => (
  <div className="flex w-full grow flex-col items-center justify-between p-5">
    <h2 className="p-4 text-2xl">Pick location</h2>
    <SearchButton handleSearch={handleSearch} />
    <div className="my-6 grid grid-cols-2 gap-4 ">
      {data.map((city) => (
        <div
          key={city.name}
          className="grow rounded-2xl bg-[#222248] p-4 hover:bg-indigo-700  "
        >
          <div className="flex justify-between gap-4 ">
            <div>
              <p className="text-2xl font-bold leading-8 ">
                {Math.round(city.main.temp)}°C
              </p>
              <p className="text-sm text-gray-400">{city.weather[0].main}</p>
            </div>
            <div>
              <img
                src={iconObj[city.weather[0].icon][0]}
                alt={city.weather[0].description}
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-lg">{city.name}</p>
        </div>
      ))}
    </div>
    <div className="max-h-[150px] w-full">
      <Map data={data} />
    </div>
  </div>
);

export default OtherCities;
