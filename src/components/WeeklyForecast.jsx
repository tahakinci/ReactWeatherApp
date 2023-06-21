import React from "react";
import Carousel from "./carousel";
import WeeklyForecastContent from "./WeeklyForecastContent";

const WeeklyForecast = ({ todayWeather, weeklyWeather }) => (
  <>
    <Carousel data={todayWeather} />
    {weeklyWeather.map((day) => (
      <WeeklyForecastContent data={day} key={day[0].dt} />
    ))}
  </>
);

export default WeeklyForecast;
