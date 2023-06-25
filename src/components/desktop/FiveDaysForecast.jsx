const FiveDaysForecast = ({ data, icon }) => (
  <>
    <p>{`${new Date(data[4].dt * 1000)}`.substring(0, 4)}</p>
    <img src={icon} alt={data[0].weather[0].description} />
    <p>{Math.round(data[0].main.temp)}°C</p>
  </>
);

export default FiveDaysForecast;
