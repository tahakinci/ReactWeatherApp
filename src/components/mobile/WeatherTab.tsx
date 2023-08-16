import Carousel from "./Carousel";
import Charts from "../Charts";
import { ListAPIRes } from "../../WeatherAPIResponseTypes";

type WeatherTabPropsType = {
  city: string[];
  todayWeather: ListAPIRes[];
  icon: string[];
  unit: string;
  handleUnit: (arg: string | undefined) => void;
};

const WeatherTab = ({
  city,
  todayWeather,
  icon = [],
  unit,
  handleUnit,
}: WeatherTabPropsType) => (
  <div className=" flex w-full grow flex-col justify-around ">
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="pb-2 text-2xl font-bold ">{city[1]}</h2>
      <p className="text-s font-normal text-gray-400">
        {new Date(todayWeather[0]?.dt * 1000).toDateString().substring(4, 15)}
      </p>
      <button
        onClick={() => {
          const unitOptions = ["metric", "imperial"];
          handleUnit(unitOptions.find((element) => element != unit));
        }}
      >
        click me
      </button>
    </div>
    <div className="mb-4 flex w-full flex-col items-center justify-center">
      <img
        src={icon[0]}
        alt={todayWeather[0]?.weather[0]?.description}
        className="m-4 w-[100px] object-contain"
      />
      <div className="flex w-full items-center justify-evenly text-center text-xl">
        <div>
          <p className="text-lg leading-6 text-gray-400 ">Temp</p>
          <p className="text-base font-semibold">
            {Math.round(todayWeather[0]?.main?.temp)}°
            {unit === "metric" ? "C" : "F"}
          </p>
        </div>
        <div>
          <p className="text-lg text-gray-400">Wind</p>
          <p className="text-base font-semibold">
            {unit === "metric"
              ? todayWeather[0]?.wind?.speed
              : (todayWeather[0]?.wind?.speed / 1.5).toFixed(2)}{" "}
            {unit === "metric" ? "km/h" : "m/s"}
          </p>
        </div>
        <div>
          <p className="text-lg text-gray-400">Humidity</p>
          <p className="text-base font-semibold">
            {todayWeather[0]?.main?.humidity}%
          </p>
        </div>
      </div>
    </div>
    <Carousel data={todayWeather} unit={unit} />
    <Charts weather={todayWeather} unit={unit} />
  </div>
);

export default WeatherTab;
