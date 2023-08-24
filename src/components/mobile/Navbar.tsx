import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { DarkModeToggleButton } from "../../DarkModeToggleButton";

type NavbarPropsType = {
  modeSwitch: (value: {
    home: boolean;
    search: boolean;
    forecast: boolean;
  }) => void;
};

const Navbar = ({ modeSwitch }: NavbarPropsType) => {
  return (
    <div className="flex w-full items-center justify-around py-4">
      <button
        className="hover:scale-125"
        value={"home"}
        onClick={() =>
          modeSwitch({
            home: true,
            search: false,
            forecast: false,
          })
        }
      >
        <FontAwesomeIcon icon={faHouse} size="xl" />
      </button>
      <button
        className="hover:scale-125"
        value={"search"}
        onClick={() =>
          modeSwitch({
            home: false,
            search: true,
            forecast: false,
          })
        }
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
      </button>
      <button
        className="hover:scale-125"
        value={"forecast"}
        onClick={() =>
          modeSwitch({
            home: false,
            search: false,
            forecast: true,
          })
        }
      >
        <FontAwesomeIcon icon={faChartLine} size="xl" />
      </button>
      <DarkModeToggleButton />
    </div>
  );
};

export default Navbar;
