import React from "react";
import SearchButton from "./SearchButton";

const WeeklyForecast = ({ handleSearch }) => {
  return (
    <div>
      <SearchButton handleSearch={handleSearch} />
    </div>
  );
};

export default WeeklyForecast;
