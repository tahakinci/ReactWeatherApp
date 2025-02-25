import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Map from "../pages/Map";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/map",
    Component: Map,
  },
]);
