import iconObj from "../../constants/iconObj";

const WeeklyForecastContent = ({ data }) => {
  const date = `${new Date(data[4].dt * 1000)}`;
  return (
    <div className="my-4 flex w-full items-center justify-around rounded-2xl bg-[#222248] p-2  hover:bg-indigo-700 focus:bg-indigo-700 ">
      <div>
        <p className="font-bold leading-8">{date.substring(0, 4)}</p>
        <p className="text-sm text-gray-400">{date.substring(4, 10)}</p>
      </div>
      <div className="text-2xl font-bold">
        {Math.round(data[0].main.temp)}°C
      </div>
      <div>
        <img
          src={iconObj[data[0].weather[0].icon][0]}
          alt={data[0].weather[0].description}
          className="max-w-[75px] object-contain"
        />
      </div>
    </div>
  );
};

export default WeeklyForecastContent;
