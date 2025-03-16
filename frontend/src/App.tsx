import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Modal from "./components/Modal";
import Login from "./pages/Login";
import { useAppSelector } from "./hooks";
import Rain from "./components/WeatherBackgroudAnşmations/Rain";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }, [user]);

  return (
    <div className="relative">
      <Rain />
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <Login />
        </Modal>
      )}
      {user && <Home />}
    </div>
  );
};

export default App;
