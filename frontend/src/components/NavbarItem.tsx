import { useContext } from "react";
import { NavbarContext } from "../context/navbarContext";
import { Link } from "react-router-dom";

type Props = {
  text: string;
  icon?: JSX.Element;
  active?: boolean;
  alert?: boolean;
  className: string;
};

const NavbarItem = ({
  text,
  icon,
  active,
  alert,
  className,
  children,
}: Props) => {
  const { expanded } = useContext(NavbarContext);

  return (
    <li className={`${className} relative`}>
      <Link
        to={`/${text}`}
        className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100"
            : "hover:bg-indigo-200 text-gray-200 hover:text-gray-500"
        }`}
      >
        {icon}
        <h2
          className={`overflow-hidden transition-all sm:block hidden ml-2  ${
            expanded ? "w-52" : "w-0"
          }`}
        >
          {text}
        </h2>
      </Link>
      {children && expanded && (
        <ul className="ml-4 border-l border-gray-700 sm:block hidden">
          {children}
        </ul>
      )}
    </li>
  );
};

export default NavbarItem;
