import { createBrowserRouter } from "react-router-dom";
import Map from "../pages/Map";
import App from "../App";
import Cities from "../pages/Cities";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/map",
    Component: Map,
  },
  {
    path: "/city/:cityName",
    Component: App,
  },
  {
    path: "/cities",
    Component: Cities,
  },
  {
    path: "/settings",
    Component: Settings,
  },
]);
