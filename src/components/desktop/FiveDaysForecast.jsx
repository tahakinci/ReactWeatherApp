const FiveDaysForecast = ({ data, icon }) => (
  <div className="mr-5 flex grow flex-col items-center justify-around rounded-2xl bg-[#222248] last:mr-0">
    <p>{`${new Date(data[4].dt * 1000)}`.substring(0, 4)}</p>
    <img
      src={icon}
      alt={data[0].weather[0].description}
      className="max-w-[50px]"
    />
    <p>{Math.round(data[0].main.temp)}°C</p>
  </div>
);

export default FiveDaysForecast;
