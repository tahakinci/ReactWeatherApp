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
            : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all sm:block hidden  ${
            expanded ? "sm:w-32 w-0" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
      {children && expanded && (
        <ul className="ml-4 border-l border-gray-300 sm:block hidden pl-3">
          {children}
        </ul>
      )}
    </li>
  );
};

export default NavbarItem;
