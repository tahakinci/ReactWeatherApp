import { List } from "../../types";
import ForecastDay from "./ForecastDay";
import { useState } from "react";
import ForecastDayDetail from "./ForecastDayDetail";
import SelectedForecastByDay from "./SelectedForecastByDay";
import Carousel from "../../components/Carousel";

type Props = {
  splitedWeatherData: Record<string, List[]>;
};

const Forecast = ({ splitedWeatherData }: Props) => {
  const [selectedWeatherData, setSelectedWeatherData] = useState<List[]>();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  return (
    <div className="col-span-full">
      <div className="flex flex-col sm:flex-row">
        <Carousel>
          {Object.entries(splitedWeatherData).map((day, i) => {
            if (i === selectedDayIndex) {
              return (
                <div
                  key={day[0]}
                  className="h-[90%] custom-selected-width grid place-items-center "
                >
                  <SelectedForecastByDay
                    setSelectedWeatherData={setSelectedWeatherData}
                    weatherData={day[1]}
                  />
                </div>
              );
            }
            return (
              <div
                key={day[0]}
                className="h-[90%] custom-width grid place-items-center"
              >
                <ForecastDay
                  index={i}
                  setSelectedWeatherData={setSelectedWeatherData}
                  weatherData={day[1]}
                  setSelectedDayIndex={setSelectedDayIndex}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="flex flex-col sm:flex-row sm:min-h-56 ">
        <ForecastDayDetail data={selectedWeatherData ?? []} />
      </div>
    </div>
  );
};

export default Forecast;
