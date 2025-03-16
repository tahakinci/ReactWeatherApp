import React, { SetStateAction, useEffect } from "react";
import { dateToDayName } from "../../utils/converters";
import { iconById } from "../../constants";
import { List } from "../../types";

type Props = {
  weatherData: List[];
  setSelectedWeatherData: React.Dispatch<SetStateAction<List[] | undefined>>;
};

const SelectedForecastByDay = ({
  weatherData,
  setSelectedWeatherData,
}: Props) => {
  useEffect(() => {
    setSelectedWeatherData(weatherData);
  }, []);
  return (
    <div className="w-full p-2 border-t-4 border-t-green-500 ">
      <h2 className="text-left pb-1">{dateToDayName(weatherData[0].dt_txt)}</h2>
      <div className="flex items-stretch justify-between gap-2">
        <div className="flex justify-between flex-grow ">
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
        <div className="border-l-[1px] self-stretch flex-grow border-l-black">
          <p className="ml-2 w-full">{weatherData[0].weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedForecastByDay;
