import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div>
      <p>Hello World</p>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;
