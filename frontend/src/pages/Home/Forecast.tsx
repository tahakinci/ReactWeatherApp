import { List } from "../../types";
import ForecastDay from "./ForecastDay";
import { useState } from "react";
import ForecastDayDetail from "./ForecastDayDetail";
import SelectedForecastByDay from "./SelectedForecastByDay";

type Props = {
  splitedWeatherData: Record<string, List[]>;
};

const Forecast = ({ splitedWeatherData }: Props) => {
  const [selectedWeatherData, setSelectedWeatherData] = useState<List[]>();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  return (
    <div className="col-span-3">
      <div className="flex">
        {Object.entries(splitedWeatherData).map((day, i) => {
          if (i === selectedDayIndex) {
            return (
              <div key={day[0]} className="col-span-2">
                <SelectedForecastByDay
                  setSelectedWeatherData={setSelectedWeatherData}
                  weatherData={day[1]}
                />
              </div>
            );
          }
          return (
            <div key={day[0]}>
              <ForecastDay
                index={i}
                setSelectedWeatherData={setSelectedWeatherData}
                weatherData={day[1]}
                setSelectedDayIndex={setSelectedDayIndex}
              />
            </div>
          );
        })}
      </div>
      <div className="flex">
        <ForecastDayDetail data={selectedWeatherData ?? []} />
      </div>
    </div>
  );
};

export default Forecast;
