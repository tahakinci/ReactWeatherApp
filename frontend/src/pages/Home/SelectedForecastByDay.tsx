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
    <div className="flex-1">
      <div className="w-full p-2">
        <p className="text-left">{dateToDayName(weatherData[0].dt_txt)}</p>
        <div className="flex items-center justify-between ">
          <div className="flex">
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
          <div>{weatherData[0].weather[0].description}</div>
        </div>
      </div>
    </div>
  );
};

export default SelectedForecastByDay;
