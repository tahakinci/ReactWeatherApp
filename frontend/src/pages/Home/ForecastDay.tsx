import { SetStateAction } from "react";
import { iconById } from "../../constants";
import { List } from "../../types";
import { dateToDayName } from "../../utils/converters";

type Props = {
  weatherData: List[];
  setSelectedWeatherData: React.Dispatch<SetStateAction<List[] | undefined>>;
  index: number;
  setSelectedDayIndex: React.Dispatch<SetStateAction<number>>;
};

const ForecastDay = ({
  weatherData,
  setSelectedWeatherData,
  index,
  setSelectedDayIndex,
}: Props) => {
  const handleClick = () => {
    setSelectedWeatherData(weatherData);
    setSelectedDayIndex(index);
  };
  return (
    <div className="col-span-2 p-2">
      <button onClick={handleClick}>
        <p>{dateToDayName(weatherData[0].dt_txt)}</p>
        <div className="flex items-center">
          <img
            className="w-16"
            src={`/assets/${iconById(weatherData[0].weather[0].id)}.png`}
            alt=""
          />
          <div>
            <div>{Math.round(weatherData[0].main.temp_min)}°</div>
            <div>{Math.round(weatherData[0].main.temp_max)}°</div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ForecastDay;
