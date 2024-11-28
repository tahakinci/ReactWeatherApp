import { List } from "../../types";
import ForecastByDay from "./ForecastByDay";

type Props = {
  splitedWeatherData: Record<string, List[]>;
};

const Forecast = ({ splitedWeatherData }: Props) => {
  console.log(splitedWeatherData);
  return (
    <div>
      {Object.entries(splitedWeatherData).map((day) => (
        <ForecastByDay key={day[0]} weatherData={day[1]} />
      ))}
    </div>
  );
};

export default Forecast;
