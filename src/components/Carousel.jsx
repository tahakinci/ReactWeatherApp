import React from "react";
import CarouselContent from "./CarouselContent";
import iconObj from "../constants/iconObj";

const Carousel = ({ data }) => (
  <>
    {data.map((hour, index) => (
      <CarouselContent
        id={index}
        data={hour}
        icon={iconObj[hour.weather[0].icon]}
        key={hour.dt}
      />
    ))}
  </>
);

export default Carousel;