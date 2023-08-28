import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export function DarkModeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    themeCheck();
  }, []);

  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const iconToogle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
      return;
    }
  };

  const themeSwitch = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      iconToogle();
      return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    iconToogle();
  };

  return (
    <>
      <button
        className="hover:scale-125"
        onClick={() => {
          themeSwitch();
        }}
      >
        {isDarkMode ? (
          <i>
            <FontAwesomeIcon icon={faMoon} size="xl" />
          </i>
        ) : (
          <i>
            <FontAwesomeIcon icon={faSun} size="xl" />
          </i>
        )}
      </button>
    </>
  );
}
