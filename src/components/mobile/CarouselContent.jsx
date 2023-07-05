import { Link } from "react-router-dom";
const CarouselContent = ({ data, icon, id }) => (
  <div className="w-[150px] ">
    <Link to={`details/${id}`}>
      <img
        src={icon[0]}
        alt={data.weather[0].description}
        className="float-left mr-4 max-w-[50px] object-contain"
      />
      <div className="py-2 leading-6">
        <p>{data.dt_txt.substring(11, 16)}</p>
        <p>{Math.round(data.main.temp)}°C</p>
      </div>
    </Link>
  </div>
);
export default CarouselContent;
