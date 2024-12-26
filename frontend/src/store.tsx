import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducers/weatherReducer";
import selectedHourWeatherReducer from "./reducers/selectedHourReducer";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    selectedHourWeather: selectedHourWeatherReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
