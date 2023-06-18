import WeeklyForecast from "./WeeklyForecast";
import WeatherTab from "./WeatherTab";
import Charts from "./Charts";
import Map from "./Map";

const Desktop = () => {
  return (
    <>
      <WeatherTab />
      <Charts />
      <WeeklyForecast />
      <Map />
    </>
  );
};

export default Desktop;
