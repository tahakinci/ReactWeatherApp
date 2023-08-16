import { ListAPIRes } from "../WeatherAPIResponseTypes";

type ChartsPropsType = {
  weather: ListAPIRes[];
  unit: string;
};

const Charts = ({ weather, unit }: ChartsPropsType) => {
  return (
    <div className="flex w-full flex-col justify-between py-2 ">
      <h3 className="py-2 text-lg ">Rain</h3>
      <div className="flex h-[100px] w-full grow items-end ">
        {weather.map((hour) => (
          <div
            key={hour.dt}
            className="flex h-full grow flex-col items-center justify-end"
          >
            <span className="mb-auto text-xs text-white dark:text-gray-400">
              {hour?.rain ? Math.round((hour?.rain["3h"] * 10) / 3) : 0}%
            </span>
            <div
              style={{
                height: (hour.rain ? (hour.rain["3h"] * 10) / 3 : 0) + "%",
              }}
              className="w-full border-t-2 border-blue-900 bg-blue-200 dark:border-blue-500 "
            ></div>
            <div className="text-xs text-white dark:text-gray-400">
              {new Date(hour.dt_txt).toLocaleTimeString(
                [unit === "metric" ? "it-IT" : "en-US"],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;
