import { OtherCitiesAPIRes } from "../../WeatherAPIResponseTypes";

type OCDPropsType = {
  data: OtherCitiesAPIRes;
  icon: string[];
  darkMode: boolean;
};

const OtherCitiesDesktop = ({ data, icon, darkMode }: OCDPropsType) => (
  <div
    className={`${
      darkMode ? "bg-[#222248]" : "bg-sky-300"
    } mb-4 rounded-2xl p-4 last:mb-0`}
  >
    <div className="mb-2 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{data.sys.country}</p>
        <p className="text-lg font-semibold">{data.name}</p>
      </div>
      <img
        src={icon[0]}
        alt={data.weather[0].description}
        className="max-w-[50px]"
      />
    </div>
    <div className="flex items-center justify-between">
      <p className="text-sm">{data.weather[0].description}</p>
      <p>{Math.round(data.main.temp)}°C</p>
    </div>
  </div>
);

export default OtherCitiesDesktop;
