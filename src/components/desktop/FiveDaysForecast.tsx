import { ListAPIRes } from "../../WeatherAPIResponseTypes";

type FiveDaysForecastPropsType = {
  data: ListAPIRes[];
  icon: string;
  unit: string;
};

const FiveDaysForecast = ({ data, icon, unit }: FiveDaysForecastPropsType) => (
  <div className="mr-5 flex grow flex-col  flex-wrap items-center justify-around rounded-2xl bg-sky-300 last:mr-0 dark:bg-[#222248]">
    <p>{`${new Date(data[4].dt * 1000)}`.substring(0, 4)}</p>
    <img
      src={icon}
      alt={data[3].weather[0].description}
      className="max-w-[65px]"
    />
    <p>
      {Math.round(data[3].main.temp)}°{unit === "metric" ? "C" : "F"}
    </p>
  </div>
);

export default FiveDaysForecast;
