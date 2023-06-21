const CarouselContent = ({ data, icon }) => (
  <>
    <img src={icon[0]} alt={data.weather[0].description} />
    <p>{data.dt_txt.substring(11, 16)}</p>
    <p>{data.main.temp}</p>
  </>
);
export default CarouselContent;
