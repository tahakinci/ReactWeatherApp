import { List } from "../../types";
import ForecastByDay from "./ForecastByDay";
import { useState } from "react";
import ForecastByHour from "./ForecastByHour";

type Props = {
  splitedWeatherData: Record<string, List[]>;
};

const Forecast = ({ splitedWeatherData }: Props) => {
  const [selectedWeatherData, setSelectedWeatherData] = useState<List[]>();

  return (
    <div className="col-span-2">
      <div className="flex">
        {Object.entries(splitedWeatherData).map((day) => (
          <div key={day[0]}>
            <div>
              <ForecastByDay
                setSelectedWeatherData={setSelectedWeatherData}
                weatherData={day[1]}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <ForecastByHour data={selectedWeatherData ?? []} />
      </div>
    </div>
  );
};

export default Forecast;
