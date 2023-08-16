import { OtherCitiesAPIRes } from "../../WeatherAPIResponseTypes";

type OCDPropsType = {
  data: OtherCitiesAPIRes;
  icon: string[];
  unit: string;
};

const OtherCitiesDesktop = ({ data, icon, unit }: OCDPropsType) => (
  <div className="mb-4 mr-2 rounded-2xl bg-sky-300 p-4  last:mb-0 dark:bg-[#222248]">
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
      <p>
        {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
      </p>
    </div>
  </div>
);

export default OtherCitiesDesktop;
