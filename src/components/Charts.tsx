import { ListAPIRes } from "../WeatherAPIResponseTypes";

type ChartsPropsType = {
  weather: ListAPIRes[];
};

const Charts = ({ weather }: ChartsPropsType) => {
  return (
    <div className="flex w-full flex-col justify-between py-2 ">
      <h3 className="py-2 text-lg ">Rain</h3>
      <div className="flex h-[100px] w-full grow items-end ">
        {weather.map((hour) => (
          <div
            key={hour.dt}
            className="flex h-full grow flex-col items-center justify-end"
          >
            <span className="mb-auto text-xs text-gray-400">
              {hour?.rain ? Math.round(hour?.rain["3h"] * 10) : 0}%
            </span>
            <div
              style={{
                height: (hour.rain ? hour.rain["3h"] * 10 : 0) + "%",
              }}
              className="w-full border-t-2 border-blue-500 bg-blue-200 "
            ></div>
            <div className="text-xs text-gray-400">
              {hour.dt_txt.substring(11, 16)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;
