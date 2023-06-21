import React from "react";
import SearchButton from "./SearchButton";
import iconObj from "../constants/iconObj";
import Map from "./Map";

const OtherCities = ({ data, handleSearch }) => (
  <>
    <SearchButton handleSearch={handleSearch} />
    {data.map((city) => (
      <div key={city.name}>
        <p>{city.main.temp}</p>
        <p>{city.weather[0].main}</p>
        <img
          src={iconObj[city.weather[0].icon][0]}
          alt={city.weather[0].description}
        />
        <p>{city.name}</p>
      </div>
    ))}
    <Map data={data} />
  </>
);

export default OtherCities;
