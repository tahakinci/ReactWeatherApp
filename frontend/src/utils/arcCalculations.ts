import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

type PointCoordiante = {
  x: number;
  y: number;
};

dayjs.extend(utc);

export const toRadian = (angle: number) => {
  return angle * (Math.PI / 180);
};

function mapValueX(value: number) {
  return ((value + 1) / 2) * 100;
}
function mapValueY(value: number) {
  return value * 100;
}

export const getSunCoordinates = (angle: number): PointCoordiante => {
  const x = Math.cos(toRadian(angle));
  const y = Math.sin(toRadian(angle));

  const precision = 1e-10;
  const roundedX = Math.abs(x) < precision ? 0 : x;
  const roundedY = Math.abs(y) < precision ? 0 : y;

  const coordinates = {
    x: mapValueX(-roundedX),
    y: mapValueY(roundedY),
  };

  // My coordinates works little bit diffrent from unit circle so i made some kind of mapping
  // In unit circle [-1, 1] range of values but css i use position and percentage so for me x: -1 equals to 0 x:1 equals to 100

  return coordinates;
};

export const getMoonCoordinates = (angle: number): PointCoordiante => {
  const x = Math.cos(toRadian(angle));
  const y = Math.sin(toRadian(angle));

  const precision = 1e-10;
  const roundedX = Math.abs(x) < precision ? 0 : x;
  const roundedY = Math.abs(y) < precision ? 0 : y;

  const coordinates = {
    x: mapValueX(roundedX),
    y: mapValueY(roundedY),
  };

  return coordinates;
};

export const mapCurrentTimeAsDegree = (
  sunrise: dayjs.Dayjs,
  sunset: dayjs.Dayjs,
  timezone: number
) => {
  const nowAsMinute =
    dayjs().utc().hour() * 60 + dayjs().minute() + timezone / 60;
  const sunriseAsMinute = sunrise.hour() * 60 + sunrise.minute();
  const sunsetAsMinute = sunset.hour() * 60 + sunset.minute();
  //   const isNight = nowAsMinute < sunriseAsMinute || nowAsMinute > sunsetAsMinute;

  const diametre = isNight(sunrise, sunset, timezone)
    ? Math.abs(1440 - (sunsetAsMinute - sunriseAsMinute))
    : Math.abs(sunriseAsMinute - sunsetAsMinute);

  const radius = diametre / 2;

  const centerPoint = isNight(sunrise, sunset, timezone)
    ? (sunsetAsMinute + (sunsetAsMinute + diametre)) / 2
    : (sunriseAsMinute + sunsetAsMinute) / 2;
  const x = centerPoint - nowAsMinute;

  const coordinateRadius = Math.acos(x / radius);
  const coordinateDegree = coordinateRadius * (180 / Math.PI);

  return coordinateDegree;
};

export const getTheLightSource = (degree: number, isDay: boolean) => {
  if (!isDay) return getMoonCoordinates(degree);
  return getSunCoordinates(degree);
};

export const isNight = (
  sunrise: dayjs.Dayjs,
  sunset: dayjs.Dayjs,
  timezone: number
) => {
  const now = asMinute(dayjs().utc()) + timezone / 60;
  return now < asMinute(sunrise) || now > asMinute(sunset);
};

export const asMinute = (time: dayjs.Dayjs) => {
  return time.hour() * 60 + time.minute();
};
