import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Map from "../pages/Map";
import ForecastDetail from "../pages/Home/ForecastDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        path: "/:id",
        Component: ForecastDetail,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/map",
    Component: Map,
  },
]);
