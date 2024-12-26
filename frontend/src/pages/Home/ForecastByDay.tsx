import { SetStateAction } from "react";
import { iconById } from "../../constants";
import { List } from "../../types";
import { dateToDayName } from "../../utils/converters";

type Props = {
  weatherData: List[];
  setSelectedWeatherData: React.Dispatch<SetStateAction<List[] | undefined>>;
};

const ForecastByDay = ({ weatherData, setSelectedWeatherData }: Props) => {
  return (
    <div>
      <button onClick={() => setSelectedWeatherData(weatherData)}>
        {dateToDayName(weatherData[0].dt_txt)}
        <img
          style={{ width: "100px" }}
          src={`/assets/${iconById(weatherData[0].weather[0].id)}.png`}
          alt=""
        />
        {Math.round(weatherData[0].main.temp)}°
      </button>
    </div>
  );
};

export default ForecastByDay;
