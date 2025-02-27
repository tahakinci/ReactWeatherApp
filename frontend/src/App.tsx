import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Modal from "./components/Modal";
import Login from "./pages/Login";
import { useAppSelector } from "./hooks";
import usersService from "./services/users";
import { LoggedInUser } from "./types";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userData, setUserData] = useState<LoggedInUser | null>(null);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      setIsOpen(true);
      return;
    }
    getUserData(user?.id);
    setIsOpen(false);
  }, [user]);

  const getUserData = async (id: string) => {
    if (!id) return;
    const newUser = await usersService.getUser(id);
    if (newUser) {
      setUserData(newUser);
    }
  };

  // useEffect(() => {
  //   if (user) return;
  //   const loggedUserJSON = window.localStorage.getItem("loggedWeatherAppUser");
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //   } else {
  //   }
  // }, [user]);

  return (
    <>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <Login />
        </Modal>
      )}
      {user && <Home data={userData} />}
    </>
  );
};

export default App;
