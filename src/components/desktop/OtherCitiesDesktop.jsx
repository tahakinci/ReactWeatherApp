import React from "react";

const OtherCitiesDesktop = ({ data, icon }) => (
  <>
    <div>
      <div>
        <p>{data.sys.country}</p>
        <p>{data.name}</p>
        <p>{data.weather[0].description}</p>
      </div>
      <div>
        <img src={icon[0]} alt={data.weather[0].description} />
        <p>{Math.round(data.main.temp)}°C</p>
      </div>
    </div>
  </>
);

export default OtherCitiesDesktop;
