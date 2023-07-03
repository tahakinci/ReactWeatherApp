import Carousel from "./Carousel";
import Charts from "../Charts";

const WeatherTab = ({ city, todayWeather, icon = [] }) => (
  <div className=" flex w-full grow flex-col justify-around ">
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="pb-2 text-2xl font-bold ">{city[1]}</h2>
      <p className="text-s font-normal text-gray-400">
        {Date(todayWeather[0]?.dt).substring(4, 15)}
      </p>
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
            {Math.round(todayWeather[0]?.main?.temp)}°C
          </p>
        </div>
        <div>
          <p className="text-lg text-gray-400">Wind</p>
          <p className="text-base font-semibold">
            {todayWeather[0]?.wind?.speed} km/h
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
    <Charts weather={todayWeather} />
    <Carousel data={todayWeather} />
  </div>
);

export default WeatherTab;
