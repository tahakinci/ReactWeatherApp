import React from "react";
import { createRoot } from "react-dom/client";
import SearchParams from "./components/SearchParams";
import Details from "./components/Details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [locationCoord, setLocationCoord] = useState([]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const successCallback = (position) => {
    setLocationCoord([position.coords.latitude, position.coords.longitude]);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient} >
        <Routes>
          <Route path="details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams coord={locationCoord} />} />
        </Routes>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;
