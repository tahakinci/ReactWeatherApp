import { Link, Route, Routes } from "react-router-dom";
import { iconById } from "../../constants";
import { List } from "../../types";
import { dateToDayName } from "../../utils/converters";

type Props = {
  weatherData: List[];
};

const ForecastByDay = ({ weatherData }: Props) => {
  return (
    <div>
      {/* {weatherData.map((day) => {
        const date = dateToDayName(day.dt_txt);
        return (
          <div>
            {date}
            <img
              style={{ width: "100px" }}
              src={`/assets/${iconById(weatherData[0].weather[0].id)}.png`}
              alt=""
            />
            {day.main.temp}
          </div>
        );
      })} */}
      {dateToDayName(weatherData[0].dt_txt)}
      <img
        style={{ width: "100px" }}
        src={`/assets/${iconById(weatherData[0].weather[0].id)}.png`}
        alt=""
      />
      {weatherData[0].main.temp}
    </div>
  );
};

export default ForecastByDay;
