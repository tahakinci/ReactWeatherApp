import dayjs from "dayjs";

export const clockGenerator = (timezoneInSeconds: number): string => {
  const timezoneInMinutes = timezoneInSeconds / 60;
  const localTime = dayjs().utcOffset(timezoneInMinutes);
  return localTime.format("HH:mm");
};
