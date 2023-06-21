import Carousel from "./carousel";
import Charts from "./Charts";

const WeatherTab = ({ city, todayWeather, icon = [] }) => (
  <div>
    <div>
      <p>{city[1]}</p>
      <p>{Date(todayWeather[0]?.dt).substring(4, 15)}</p>
      <div>
        <img src={icon[0]} alt={todayWeather[0]?.weather[0]?.description} />
        <div>
          <div>
            <p>Temp</p>
            <p>{todayWeather[0]?.main?.temp}</p>
          </div>
          <div>
            <p>Wind</p>
            <p>{todayWeather[0]?.wind?.speed}</p>
          </div>
          <div>
            <p>Humidity</p>
            <p>{todayWeather[0]?.main?.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
    <Charts weather={todayWeather} />
    <div>
      <Carousel data={todayWeather} />
    </div>
  </div>
);

export default WeatherTab;
