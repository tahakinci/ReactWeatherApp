import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducers/weatherReducer";
import selectedHourWeatherReducer from "./reducers/selectedHourReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    selectedHourWeather: selectedHourWeatherReducer,
    user: userReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
