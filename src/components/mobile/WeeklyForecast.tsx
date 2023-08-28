import React from "react";
import CarouselComp from "./Carousel";
import WeeklyForecastContent from "./WeeklyForecastContent";
import { ListAPIRes } from "../../WeatherAPIResponseTypes";

type WeeklyForecastPropsType = {
  todayWeather: ListAPIRes[];
  weeklyWeather: ListAPIRes[][];
  unit: string;
};

const WeeklyForecast = ({
  todayWeather,
  weeklyWeather,
  unit,
}: WeeklyForecastPropsType) => (
  <div className="flex grow flex-col overflow-hidden">
    <h2 className=" p-5 text-center text-2xl">Forecast report</h2>
    <div>
      <CarouselComp data={todayWeather} unit={unit} />
    </div>
    <div className="mt-4 overflow-y-scroll scrollbar-thin scrollbar-track-sky-300 scrollbar-thumb-amber-200 scrollbar-track-rounded scrollbar-thumb-rounded dark:scrollbar-track-[#222248] dark:scrollbar-thumb-indigo-900">
      {weeklyWeather.map((day) => (
        <WeeklyForecastContent data={day} key={day[0].dt} unit={unit} />
      ))}
    </div>
  </div>
);

export default WeeklyForecast;
