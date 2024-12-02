import { Link, Outlet } from "react-router-dom";
import { List } from "../../types";
import ForecastByDay from "./ForecastByDay";

type Props = {
  splitedWeatherData: Record<string, List[]>;
};

const Forecast = ({ splitedWeatherData }: Props) => {
  return (
    <div style={{ display: "flex" }}>
      {Object.entries(splitedWeatherData).map((day) => (
        <Link key={day[0]} to={`/${day[0]}`}>
          <ForecastByDay weatherData={day[1]} />
        </Link>
      ))}
      <Outlet />
    </div>
  );
};

export default Forecast;
