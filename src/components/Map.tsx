import { OtherCitiesAPIRes } from "../WeatherAPIResponseTypes";
import iconObj from "../constants/iconObj";
type MapPropsType = {
  data: OtherCitiesAPIRes[];
  darkMode: boolean;
};

const Map = ({ data, darkMode }: MapPropsType) => {
  const GOOGLE_API_KEY = import.meta.env.REACT_API_KEY_GOOGLE;

  const mapURL = `
    https://maps.googleapis.com/maps/api/staticmap?key=${GOOGLE_API_KEY}&zoom=3&format=png&markers=icon:${
    iconObj[data[0].weather[0].icon][1]
  }|${data[0]?.name}&markers=icon:${iconObj[data[1].weather[0].icon][1]}|${
    data[1]?.name
  }&markers=icon:${iconObj[data[2].weather[0].icon][1]}|${
    data[2]?.name
  }&markers=icon:${iconObj[data[3].weather[0].icon][1]}|${data[3]?.name}${
    darkMode
      ? "&maptype=roadmap&style=element:labels%7Cvisibility:off&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0x4238c9&style=feature:poi%7Cvisibility:off&style=feature:road%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:transit%7Cvisibility:off&style=feature:water%7Celement:geometry.fill%7Ccolor:0x222248&size=480x360"
      : "&maptype=roadmap&style=element:labels%7Cvisibility:off&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:road%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:transit%7Cvisibility:off&size=480x360"
  }
    `;

  return (
    <>
      <img
        src={mapURL}
        alt="map"
        className="h-full w-full rounded-2xl object-cover"
      />
    </>
  );
};

export default Map;
