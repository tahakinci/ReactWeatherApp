import { useSelector } from "react-redux";
import { List } from "../../types";
import Card from "../../components/Card";
import WeatherMap from "./WeatherMap";

const WeatherMetrics = ({ cityData }) => {
  const data: List = useSelector((state) => state.selectedHourWeather);

  if (Object.keys(data).length) {
    return (
      <div className="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Card header="FEELS LIKE">
          <div>{data.main?.feels_like}</div>
        </Card>
        <Card className="col-span-2" header="WIND">
          <div className="flex">
            <div className="w-[50%]">
              <p>
                Wind <span className="text-right">{data.wind.speed} km/h</span>
              </p>
            </div>
            <div></div>
          </div>
        </Card>
        <Card header="SUNSET">
          <div>
            <p>{cityData.sunrise}</p>
            <p>{cityData.sunset}</p>
          </div>
        </Card>
        <Card header="VISIBILITY">
          <div>{data.visibility / 1000} km</div>
        </Card>
        <Card header="HUMIDITY">
          <div>
            <p>%{data.main.humidity}</p>
          </div>
        </Card>
        <Card header="PRESSURE">
          <div>{data.main.pressure}</div>
        </Card>
        <Card header="CLOUDNESS">
          <div>{data.clouds.all}%</div>
        </Card>
        <Card header="GROUND LEVEL">
          <div>
            <p>{data.main.sea_level}</p>
            <p>{data.main.grnd_level}</p>
          </div>
        </Card>
        <WeatherMap data={cityData} />
      </div>
    );
  }
};

export default WeatherMetrics;
