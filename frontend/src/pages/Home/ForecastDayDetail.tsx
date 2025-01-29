import { List } from "../../types";

import { setSelectedHourWeatherData } from "../../reducers/selectedHourReducer";
import { useEffect, useState } from "react";
import ForecastHour from "./ForecastHour";

type Props = {
  data: List[];
};

const ForecastDayDetail = ({ data }: Props) => {
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);

  useEffect(() => {
    setSelectedDataIndex(0);
  }, [data]);

  return (
    <>
      {data.map((hour, i) => {
        if (selectedDataIndex === i)
          return (
            <ForecastHour
              key={hour.dt}
              isSelected={true}
              data={hour}
              index={i}
              setSelectedDataIndex={setSelectedDataIndex}
              setSelectedHourWeatherData={setSelectedHourWeatherData}
            />
          );
        return (
          <ForecastHour
            key={hour.dt}
            isSelected={false}
            data={hour}
            index={i}
            setSelectedDataIndex={setSelectedDataIndex}
            setSelectedHourWeatherData={setSelectedHourWeatherData}
          />
        );
      })}
    </>
  );
};

export default ForecastDayDetail;
