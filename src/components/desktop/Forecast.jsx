import { useState, useEffect } from "react";
import FiveDaysForecast from "./FiveDaysForecast";
import iconObj from "../../constants/iconObj";

const Forecast = ({ today, otherDays, icon, city }) => {
  const [time, setTime] = useState("");
  useEffect(() => {
    setInterval(hour, 1000);
  }, []);

  const [sunrise, sunset] = [
    new Date(city?.sunrise * 1000),
    new Date(city?.sunset * 1000),
  ];

  function hour() {
    const date = new Date();
    const time = date.toLocaleTimeString(["en-US"], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(time);
  }
  return (
    <div className="flex">
      <div className=" mr-5 grow rounded-2xl bg-[#222248]">
        <div className="flex justify-between rounded-t-2xl  bg-indigo-900 p-4">
          <p className="text-xl font-bold">
            {Date(today[0]?.dt).substring(0, 4)}
          </p>
          <p className="text-xl font-bold">{time}</p>
        </div>
        <div className="flex justify-between  p-4">
          <div>
            <p className="text-[3rem]">{Math.round(today[0]?.main?.temp)}°C</p>
            <p className="text-sm">
              <span className="text-gray-400">Real Feel:</span>{" "}
              {Math.round(today[0]?.main?.feels_like)}°C
            </p>
            <p className="text-sm">
              <span className="text-gray-400">Wind:</span>{" "}
              {today[0]?.wind.speed} km/h
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
          <div className="flex flex-col justify-between">
            <img
              src={icon[0]}
              alt={today[0]?.weather[0]?.description}
              className="m-auto my-0 max-w-[100px]"
            />
            <div>
              <p className="text-sm">
                <span className="text-gray-400">Sunrise: {""}</span>
                {sunrise.toLocaleTimeString(["en-us"], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm">
                <span className="text-gray-400">Sunset: {""}</span>
                {sunset.toLocaleTimeString(["en-us"], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow">
        {otherDays.map((day) => (
          <FiveDaysForecast
            key={day.dt}
            data={day}
            icon={iconObj[day[0].weather[0].icon][0]}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
