import { useNavigate } from "react-router-dom";
import { UserCityData } from "../../types";

type Props = {
  city: UserCityData;
  index: number;
};

const City = ({ city, index }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/city/${city.name.toLocaleLowerCase()}`);
    window.localStorage.setItem("weatherAppSelectedNavItemIndex", `${index}`);
  };
  return (
    <div onClick={handleClick}>
      <div className="p-4 border-2 border-black mb-2 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <p>{city.name}</p>
            <p> {city.isLocation ? "My Location" : "Saat gelecek"}</p>
          </div>
          <p>{city.mainTemp}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>{city.description}</p>
          <div>
            H: {city.maxTemp} <span>L: {city.minTemp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
