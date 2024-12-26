import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { List } from "../types";

const initialState: List = {} as List;

const selectedHourSlice = createSlice({
  name: "selectedHour",
  initialState,
  reducers: {
    setSelectedHourData(_state, action: PayloadAction<List>) {
      return action.payload;
    },
  },
});

export const setSelectedHourWeatherData = (weatherData: List) => {
  return async (dispatch: Dispatch) => {
    dispatch(setSelectedHourData(weatherData));
  };
};

export const { setSelectedHourData } = selectedHourSlice.actions;

export default selectedHourSlice.reducer;
