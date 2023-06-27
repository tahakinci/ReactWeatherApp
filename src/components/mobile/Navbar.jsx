import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faChartLine,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ TODO_ }) => {
  return (
    <div className="flex w-full items-center justify-around py-5">
      <button
        value={"home"}
        onClick={() =>
          TODO_({
            home: true,
            search: false,
            forecast: false,
            darkMode: true,
          })
        }
      >
        <FontAwesomeIcon icon={faHouse} size="xl" />
      </button>
      <button
        value={"search"}
        onClick={() =>
          TODO_({
            home: false,
            search: true,
            forecast: false,
            darkMode: true,
          })
        }
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
      </button>
      <button
        value={"forecast"}
        onClick={() =>
          TODO_({
            home: false,
            search: false,
            forecast: true,
            darkMode: true,
          })
        }
      >
        <FontAwesomeIcon icon={faChartLine} size="xl" />
      </button>
      <button
        value={"darkMode"}
        onClick={() =>
          TODO_({
            home: true,
            search: false,
            forecast: false,
            darkMode: false,
          })
        }
      >
        <FontAwesomeIcon icon={faSun} size="xl" />
      </button>
    </div>
  );
};

export default Navbar;
