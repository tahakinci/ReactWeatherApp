import { ListAPIRes } from "../../WeatherAPIResponseTypes";

type CarouselContentPropsType = {
  data: ListAPIRes;
  icon: string[];
  id?: number;
  unit: string;
};

const CarouselContent = ({ data, icon, unit }: CarouselContentPropsType) => (
  <div className="w-[150px] ">
    <img
      src={icon[0]}
      alt={data.weather[0].description}
      className="float-left mr-4 max-w-[50px] object-contain"
    />
    <div className="py-2 leading-6">
      <p>{data.dt_txt.substring(11, 16)}</p>
      <p>
        {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
      </p>
    </div>
  </div>
);
export default CarouselContent;
