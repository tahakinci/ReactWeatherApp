import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducers/weatherReducer";
import selectedHourWeatherReducer from "./reducers/selectedHourReducer";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    selectedHourWeather: selectedHourWeatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
