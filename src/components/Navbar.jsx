const Navbar = ({ TODO_ }) => {
  return (
    <>
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
      ></button>
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
      ></button>
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
      ></button>
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
      ></button>
    </>
  );
};

export default Navbar;
