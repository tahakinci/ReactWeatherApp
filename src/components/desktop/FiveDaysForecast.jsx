const FiveDaysForecast = ({ data, icon }) => (
  <div className="grow">
    <p>{`${new Date(data[4].dt * 1000)}`.substring(0, 4)}</p>
    <img src={icon} alt={data[0].weather[0].description} />
    <p>{Math.round(data[0].main.temp)}°C</p>
  </div>
);

export default FiveDaysForecast;
