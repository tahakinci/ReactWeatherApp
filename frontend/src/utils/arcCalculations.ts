import dayjs, { Dayjs } from "dayjs";
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
  now: dayjs.Dayjs
) => {
  const diametre = isNight(sunrise, sunset, now)
    ? Math.abs(1440 - (asMinute(sunset) - asMinute(sunrise)))
    : Math.abs(asMinute(sunrise) - asMinute(sunset));

  const radius = diametre / 2;

  const centerPoint = isNight(sunrise, sunset, now)
    ? (asMinute(sunset) + (asMinute(sunset) + diametre)) / 2
    : (asMinute(sunrise) + asMinute(sunset)) / 2;
  const isAfterMidnight = now.hour() >= 0 && now.hour() < sunrise.hour();
  const x = isAfterMidnight
    ? centerPoint -
      (asMinute(sunset) + (asMinute(now) + (24 - sunset.hour()) * 60))
    : centerPoint - asMinute(now);

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
  now: dayjs.Dayjs
) => {
  return asMinute(now) < asMinute(sunrise) || asMinute(now) > asMinute(sunset);
};

export const asMinute = (time: dayjs.Dayjs) => {
  return time.hour() * 60 + time.minute();
};

export const convertMinutesToTime = (
  minutes: number,
  isClockFormat = false,
  seperator: ":" | "." | "," = ":"
) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (!isClockFormat) return `${hours} hours ${remainingMinutes} minutes`;
  return `${hours}${seperator}${
    remainingMinutes < 10 ? "0" : ""
  }${remainingMinutes}`;
};

export const timeUntilEvent = (sunset: Dayjs, sunrise: Dayjs, now: Dayjs) => {
  const sunsetMinutes = asMinute(sunset);
  const sunriseMinutes = asMinute(sunrise);
  const nowMinutes = asMinute(now);

  const totalMinutesInDay = 24 * 60;

  if (nowMinutes >= sunriseMinutes && nowMinutes < sunsetMinutes) {
    return `${convertMinutesToTime(sunsetMinutes - nowMinutes)} until sunset `;
  } else {
    if (nowMinutes > sunsetMinutes) {
      return `${convertMinutesToTime(
        totalMinutesInDay - nowMinutes + sunriseMinutes
      )} until sunrise`;
    } else {
      return `${convertMinutesToTime(
        sunriseMinutes - nowMinutes
      )} until sunrise`;
    }
  }
};
