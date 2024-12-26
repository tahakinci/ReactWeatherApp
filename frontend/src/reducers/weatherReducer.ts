import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Forecast } from "../types";

const initialState: Forecast = {} as Forecast;

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather(_state, action: PayloadAction<Forecast>) {
      return action.payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
