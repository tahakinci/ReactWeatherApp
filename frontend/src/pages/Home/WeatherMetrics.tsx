import { City } from "../../types";
import FeelsLike from "./MetricsComponents/FeelsLike";
import Sunset from "./MetricsComponents/Sunset";
import Visibility from "./MetricsComponents/Visibility";
import Humidity from "./MetricsComponents/Humidity";
import Wind from "./MetricsComponents/Wind";
import Pressure from "./MetricsComponents/Pressure";
import Cloudness from "./MetricsComponents/Cloudness";
import GroundLevel from "./MetricsComponents/GroundLevel";
import WeatherMap from "./MetricsComponents/WeatherMap";
import { useAppSelector } from "../../hooks";

type Props = {
  cityData: City;
};

const WeatherMetrics = ({ cityData }: Props) => {
  const data = useAppSelector((state) => state.selectedHourWeather);

  if (Object.keys(data).length) {
    return (
      <div className="col-span-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <WeatherMap />
        <FeelsLike data={data} />
        <Sunset data={data} cityData={cityData} />
        <Visibility data={data} />
        <Humidity data={data} />
        <Wind data={data} />
        <Pressure data={data} />
        <Cloudness data={data} />
        <GroundLevel data={data} />
      </div>
    );
  }
};

export default WeatherMetrics;
