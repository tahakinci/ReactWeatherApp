import dayjs from "dayjs";
import React, { SetStateAction, useEffect } from "react";
import { iconById } from "../../constants";
import { useAppDispatch } from "../../hooks";
import { List } from "../../types";
import { Dispatch } from "@reduxjs/toolkit";

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

  useEffect(() => {
    handleSelection();
  }, [isSelected]);
  return (
    <div className={`${isSelected ? "bg-red-300" : ""}`}>
      <button onClick={() => setSelectedDataIndex(index)}>
        <div>
          <p>{dayjs(data.dt_txt).format("HH:mm")}</p>{" "}
          <img
            style={{ width: "100px" }}
            src={`/assets/${iconById(data.weather[0].id)}.png`}
            alt=""
          />
          <p>{Math.round(data.main.temp)}°</p>
        </div>
      </button>
    </div>
  );
};

export default ForecastHour;
