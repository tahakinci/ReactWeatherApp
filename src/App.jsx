import React from "react";
import { createRoot } from "react-dom/client";
import SearchParams from "./components/SearchParams";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
    <QueryClientProvider client={queryClient}>
      <SearchParams coord={locationCoord} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;
