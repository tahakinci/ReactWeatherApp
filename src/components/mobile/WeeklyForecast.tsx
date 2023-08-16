import React from "react";
import Carousel from "./Carousel";
import WeeklyForecastContent from "./WeeklyForecastContent";
import { ListAPIRes } from "../../WeatherAPIResponseTypes";

type WeeklyForecastPropsType = {
  todayWeather: ListAPIRes[];
  weeklyWeather: ListAPIRes[][];
};

const WeeklyForecast = ({
  todayWeather,
  weeklyWeather,
}: WeeklyForecastPropsType) => (
  <div className="flex grow flex-col overflow-hidden">
    <h2 className=" p-5 text-center text-2xl">Forecast report</h2>
    <div>
      <Carousel data={todayWeather} />
    </div>
    <div className="mt-4 overflow-y-scroll scrollbar-thin scrollbar-track-sky-300 scrollbar-thumb-amber-200 scrollbar-track-rounded scrollbar-thumb-rounded dark:scrollbar-track-[#222248] dark:scrollbar-thumb-indigo-900">
      {weeklyWeather.map((day) => (
        <WeeklyForecastContent data={day} key={day[0].dt} />
      ))}
    </div>
  </div>
);

export default WeeklyForecast;
