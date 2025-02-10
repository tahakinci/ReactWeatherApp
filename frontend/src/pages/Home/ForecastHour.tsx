import dayjs from "dayjs";
import { SetStateAction, useEffect } from "react";
import { iconById } from "../../constants";
import { useAppDispatch } from "../../hooks";
import { List } from "../../types";
import { Dispatch } from "@reduxjs/toolkit";
import Precipitation from "../../components/Precipitation";

type Props = {
  data: List;
  isSelected: boolean;
  index: number;
  setSelectedDataIndex: React.Dispatch<SetStateAction<number>>;
  setSelectedHourWeatherData: (
    data: List
  ) => (dispatch: Dispatch) => Promise<void>;
};

const ForecastHour = ({
  data,
  isSelected,
  index,
  setSelectedDataIndex,
  setSelectedHourWeatherData,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleSelection = () => {
    if (isSelected) {
      dispatch(setSelectedHourWeatherData(data));
    }
    return;
  };

  const getPrecipitation = () => {
    if ("snow" in data) {
      return <Precipitation type="snow" precipitation={data.snow["3h"]} />;
    } else if ("rain" in data) {
      return <Precipitation type="rain" precipitation={data.rain["3h"]} />;
    }
    return "0%";
  };

  getPrecipitation();

  useEffect(() => {
    handleSelection();
  }, [isSelected]);
  return (
    <div className={`${isSelected ? "bg-red-300" : ""} p-2`}>
      <button
        onClick={() => setSelectedDataIndex(index)}
        className="w-full h-full"
      >
        <div className="flex sm:flex-col justify-between items-center h-full">
          <p>{dayjs(data.dt_txt).format("HH:mm")}</p>{" "}
          <img
            className="w-14 sm:w-24"
            src={`/assets/${iconById(data.weather[0].id)}.png`}
            alt=""
          />
          {getPrecipitation()}
          <p>{Math.round(data.main.temp)}°</p>
        </div>
      </button>
    </div>
  );
};

export default ForecastHour;
