import Carousel from "./Carousel";
import Charts from "../Charts";

const WeatherTab = ({ city, todayWeather, icon = [] }) => (
  <div className=" flex h-full  w-full flex-col overflow-hidden p-3">
    <div className="flex flex-col items-center justify-center p-2">
      <h2 className="pb-2 text-2xl font-bold ">{city[1]}</h2>
      <p className="text-s font-normal">
        {Date(todayWeather[0]?.dt).substring(4, 15)}
      </p>
    </div>
    <div className="mb-4 flex w-full flex-col items-center justify-center ">
      <img
        src={icon[0]}
        alt={todayWeather[0]?.weather[0]?.description}
        className="min-w-[192px]"
      />
      <div className="flex w-full items-center justify-evenly text-center text-xl">
        <div>
          <p>Temp</p>
          <p className="font-semibold">
            {Math.round(todayWeather[0]?.main?.temp)}°C
          </p>
        </div>
        <div>
          <p>Wind</p>
          <p className="font-semibold">{todayWeather[0]?.wind?.speed} km/h</p>
        </div>
        <div>
          <p>Humidity</p>
          <p className="font-semibold">{todayWeather[0]?.main?.humidity}%</p>
        </div>
      </div>
    </div>
    <Charts weather={todayWeather} />
    <Carousel data={todayWeather} />
  </div>
);

export default WeatherTab;
