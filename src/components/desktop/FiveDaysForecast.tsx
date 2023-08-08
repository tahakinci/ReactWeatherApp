import { ListAPIRes } from "../../WeatherAPIResponseTypes";

type FiveDaysForecastPropsType = {
  data: ListAPIRes[];
  icon: string;
};

const FiveDaysForecast = ({ data, icon }: FiveDaysForecastPropsType) => (
  <div className="mr-5 flex grow  flex-col flex-wrap items-center justify-around rounded-2xl bg-[#222248] last:mr-0">
    <p>{`${new Date(data[4].dt * 1000)}`.substring(0, 4)}</p>
    <img
      src={icon}
      alt={data[3].weather[0].description}
      className="max-w-[65px]"
    />
    <p>{Math.round(data[3].main.temp)}°C</p>
  </div>
);

export default FiveDaysForecast;
