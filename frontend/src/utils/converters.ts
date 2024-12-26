import { DaysOfWeek, Forecast, List } from "../types";
import dayjs from "dayjs";

export const splitWeatherByDate = (data: Forecast) => {
  if (!Object.keys(data).length) return {};
  return data.list.reduce((acc, cur) => {
    const date = cur.dt_txt.split(" ")[0];
    if (!acc[date]) {
      acc[date] = [cur];
    } else {
      acc[date].push(cur);
    }
    return acc;
  }, {} as Record<string, List[]>);
};

export const dateToDayName = (dateStr: string) => {
  const today = dayjs().day();
  const date = dayjs(dateStr).day();
  switch (Math.abs(today - date)) {
    case 0:
      return "Today";
    case 1:
      return "Tomorrow";

    default:
      return dayNumberToDayStr(date);
  }
};

const dayNumberToDayStr = (day: number): string => {
  if (day < 0 || day > 6) throw new Error("Day number must be between 0 and 6");

  return DaysOfWeek[day];
};
