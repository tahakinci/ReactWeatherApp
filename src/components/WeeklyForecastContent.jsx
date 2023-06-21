import iconObj from "../constants/iconObj";

const WeeklyForecastContent = ({ data }) => {
  const date = `${new Date(data[4].dt * 1000)}`;
  return (
    <div>
      <div>
        <p>{date.substring(0, 4)}</p>
        <p>{date.substring(4, 10)}</p>
      </div>
      <div>{data[0].main.temp}</div>
      <div>
        <img
          src={iconObj[data[0].weather[0].icon][0]}
          alt={data[0].weather[0].description}
        />
      </div>
    </div>
  );
};

export default WeeklyForecastContent;
