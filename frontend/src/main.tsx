import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
