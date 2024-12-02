import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { List } from "../types";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {},
  reducers: {
    setWeather(_state, action) {
      return action.payload;
    },
  },
});

export const getWeatherData = (weatherData: Record<string, List[]>) => {
  return async (dispatch: Dispatch) => {
    dispatch(setWeather(weatherData));
  };
};

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
