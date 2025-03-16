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
    <div className=" w-full border-b-4 p-2 border-green-300 hover:border-b-0 hover:border-t-4 hover:border-t-green-500">
      <button className="w-full" onClick={handleClick}>
        <h2 className="text-left pb-1">
          {dateToDayName(weatherData[0].dt_txt)}
        </h2>
        <div className="flex items-center justify-between">
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
