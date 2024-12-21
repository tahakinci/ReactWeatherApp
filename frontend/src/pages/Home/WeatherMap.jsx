import React, { useEffect, useState } from "react";

const WeatherMap = ({ data }) => {
  // const [imageSourceUrl, setImageSourceUrl] = useState("");

  // const downloadImageAndSetSource = async (imageUrl) => {
  //   const image = await fetchBlob(imageUrl);
  //   setImageSourceUrl(URL.createObjectURL(image));
  // };
  // const url = `https://tile.openweathermap.org/map/clouds_new/${6}/${Math.floor(
  //   data.coord.lat
  // )}/${Math.floor(data.coord.lon)}.png?appid=26b9b4c125d2adfa37070928884bbfcc`;

  // useEffect(() => {
  //   fetchBlob();
  //   downloadImageAndSetSource();
  // }, []);

  // const fetchBlob = async () => {
  //   const res = await fetch(url);
  //   const json = await res.blob();
  //   console.log(json);
  //   return json;
  // };

  return <div>asd</div>;
};

export default WeatherMap;
