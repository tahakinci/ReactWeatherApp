import { Link } from "react-router-dom";
const CarouselContent = ({ data, icon, id }) => (
  <>
    <Link to={`details/${id}`}>
      <img src={icon[0]} alt={data.weather[0].description} />
      <p>{data.dt_txt.substring(11, 16)}</p>
      <p>{Math.round(data.main.temp)}°C</p>
    </Link>
  </>
);
export default CarouselContent;
