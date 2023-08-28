import { ListAPIRes } from "../../WeatherAPIResponseTypes";
import iconObj from "../../utils/iconObj";

type WeeklyForecastContent = {
  data: ListAPIRes[];
  unit: string;
};

const WeeklyForecastContent = ({ data, unit }: WeeklyForecastContent) => {
  const date = `${new Date(data[4].dt * 1000)}`;
  return (
    <div className="my-4 mr-2 flex items-center justify-around rounded-2xl bg-sky-300 p-2 first:mt-0 hover:bg-amber-200 focus:bg-amber-200 dark:bg-[#222248]  dark:hover:bg-indigo-700 dark:focus:bg-indigo-700 ">
      <div>
        <p className="font-bold leading-8">{date.substring(0, 4)}</p>
        <p className="text-sm text-gray-400">{date.substring(4, 10)}</p>
      </div>
      <div className="text-2xl font-bold">
        {Math.round(data[0].main.temp)}°{unit === "metric" ? "C" : "F"}
      </div>
      <div>
        <img
          src={iconObj[data[0].weather[0].icon][0]}
          alt={data[0].weather[0].description}
          className="max-w-[75px] object-contain"
        />
      </div>
    </div>
  );
};

export default WeeklyForecastContent;
