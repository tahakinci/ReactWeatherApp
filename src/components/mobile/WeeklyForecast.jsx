import React from "react";
import Carousel from "./Carousel";
import WeeklyForecastContent from "./WeeklyForecastContent";

const WeeklyForecast = ({ todayWeather, weeklyWeather }) => (
  <div className="flex grow flex-col overflow-hidden">
    <h2 className=" p-5 text-center text-2xl">Forecast report</h2>
    <div>
      <Carousel data={todayWeather} />
    </div>
    <div className="overflow-y-scroll">
      {weeklyWeather.map((day) => (
        <WeeklyForecastContent data={day} key={day[0].dt} />
      ))}
    </div>
  </div>
);

export default WeeklyForecast;
