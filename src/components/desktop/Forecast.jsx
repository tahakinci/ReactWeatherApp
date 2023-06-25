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
    <>
      <div>
        <p>{Date(today[0]?.dt).substring(0, 4)}</p>
        <p>{time}</p>
      </div>
      <div>
        <div>
          <p>{Math.round(today[0]?.main?.temp)}°C</p>
          <p>Real Feel: {Math.round(today[0]?.main?.feels_like)}°C</p>
          <p>Wind: {today[0]?.wind.speed} km/h</p>
          <p>Pressure: {today[0]?.main?.pressure} MB</p>
          <p>Humidity: {today[0]?.main?.humidity} %</p>
        </div>
        <div>
          <img src={icon[0]} alt={today[0]?.weather[0]?.description} />
          <p>
            Sunrise:{" "}
            {sunrise.toLocaleTimeString(["en-us"], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>
            Sunset:{" "}
            {sunset.toLocaleTimeString(["en-us"], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
      {otherDays.map((day) => (
        <FiveDaysForecast
          data={day}
          icon={iconObj[day[0].weather[0].icon][0]}
        />
      ))}
    </>
  );
};

export default Forecast;
