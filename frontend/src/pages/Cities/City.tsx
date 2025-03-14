import { useNavigate } from "react-router-dom";
import { UserCityData } from "../../types";
import { MdOutlineDeleteForever } from "react-icons/md";

type Props = {
  city: UserCityData;
  index: number;
};

const City = ({ city, index, handleDeleteCity }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/city/${city.name.toLocaleLowerCase()}`);
    window.localStorage.setItem("weatherAppSelectedNavItemIndex", `${index}`);
  };

  return (
    <div>
      <div className="p-4 border-2 border-black mb-2 rounded-md">
        <div className="text-right">
          <button
            onClick={() => handleDeleteCity(city._id)}
            className="
              text-rose-500 hover:text-rose-400 hover:scale-125"
          >
            <MdOutlineDeleteForever />
          </button>
        </div>
        <div onClick={handleClick}>
          <div className="flex justify-between items-center">
            <div>
              <p>{city.name}</p>
              <p> {city.isLocation ? "My Location" : "Saat gelecek"}</p>
            </div>
            <p>{Math.round(city.mainTemp)}°</p>
          </div>
          <div className="flex justify-between items-center">
            <p>{city.description}</p>
            <div>
              H: {Math.round(city.maxTemp)}°{" "}
              <span>L: {Math.round(city.minTemp)}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
