import { useState, useEffect } from "react";
import FiveDaysForecast from "./FiveDaysForecast";
import iconObj from "../../constants/iconObj";
import { CityAPIRes, ListAPIRes } from "../../WeatherAPIResponseTypes";

type ForecastPropType = {
  today: ListAPIRes[];
  otherDays: ListAPIRes[][];
  icon: string[];
  city: CityAPIRes;
  unit: string;
};

const Forecast = ({
  today,
  otherDays,
  icon = [],
  city,
  unit,
}: ForecastPropType) => {
  const [time, setTime] = useState("");
  useEffect(() => {
    setInterval(hour, 60000);
  }, []);

  const [sunrise, sunset] = [
    new Date(city?.sunrise * 1000),
    new Date(city?.sunset * 1000),
  ];

  function hour() {
    const date = new Date();
    const time = date.toLocaleTimeString(
      [unit === "metric" ? "it-IT" : "en-US"],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    setTime(time);
  }
  return (
    <div className="flex flex-col gap-4 lg:flex-row ">
      <div className="rounded-2xl bg-sky-300 dark:bg-[#222248]">
        <div className="flex justify-between rounded-t-2xl bg-sky-400 p-4  dark:bg-indigo-900">
          <p className="text-xl font-bold">
            {new Date(today[0]?.dt).toDateString().substring(0, 4)}
          </p>
          <p className="text-xl font-bold">{time}</p>
        </div>
        <div className="flex flex-row p-4 lg:flex-col">
          <div className="flex justify-between gap-4">
            <p className="text-[3rem]">
              {Math.round(today[0]?.main?.temp)}°{unit === "metric" ? "C" : "F"}
            </p>
            <img
              src={icon[0]}
              alt={today[0]?.weather[0]?.description}
              className="my-0 max-w-[75px] object-contain p-2"
            />
          </div>
          <div className="flex flex-wrap gap-4 lg:flex-nowrap">
            <div className="flex w-full grow items-center justify-between lg:block">
              <p className="text-sm">
                <span className="text-gray-400">Real Feel:</span>{" "}
                {Math.round(today[0]?.main?.feels_like)}°
                {unit === "metric" ? "C" : "F"}
              </p>
              <p className="text-sm">
                <span className="text-gray-400">Wind:</span>{" "}
                {unit === "metric"
                  ? today[0]?.wind.speed
                  : (today[0]?.wind.speed / 1.5).toFixed(2)}{" "}
                {unit === "metric" ? "km/h" : "m/h"}
              </p>
              <p className="text-sm">
                <span className="text-gray-400">Pressure:</span>{" "}
                {today[0]?.main?.pressure} MB
              </p>
              <p className="text-sm">
                <span className=" text-gray-400">Humidity:</span>{" "}
                {today[0]?.main?.humidity} %
              </p>
            </div>
            <div className="flex grow items-center justify-center gap-4 lg:block lg:self-end">
              <p className="text-sm">
                <span className="text-gray-400">Sunrise: {""}</span>
                {sunrise.toLocaleTimeString(
                  [unit === "metric" ? "it-IT" : "en-US"],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
              <p className="text-sm">
                <span className="text-gray-400">Sunset: {""}</span>
                {sunset.toLocaleTimeString(
                  [unit === "metric" ? "it-IT" : "en-US"],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow">
        {otherDays.map((day) => (
          <FiveDaysForecast
            key={day[0].dt}
            data={day}
            icon={iconObj[day[0].weather[0].icon][0]}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
