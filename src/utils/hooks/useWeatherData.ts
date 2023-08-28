import { ListAPIRes } from "../../WeatherAPIResponseTypes";

interface SeperatedDaysType {
  [k: string]: ListAPIRes[];
}

type ConvertedDataType<T> = {
  [K in keyof T]: T;
};

export function useWeatherData(list: ListAPIRes[]) {
  const convertData = () => {
    const seperatedDays: SeperatedDaysType = {};
    if (list) {
      list.forEach((item) => {
        const dateStr = item.dt_txt.split(" ")[0];
        const date = new Date(dateStr).toDateString();
        if (!seperatedDays[date]) {
          seperatedDays[date] = [];
        }
        seperatedDays[date].push(item);
      });
      const arr: ConvertedDataType<ListAPIRes[]> = [];
      Object.entries(seperatedDays).map((item) => {
        arr.push(item[1]);
      });
      return arr;
    }
    return [];
  };

  function setDays(data: ListAPIRes[][]) {
    const todayArr: ListAPIRes[] = [];
    const otherDaysArr: ListAPIRes[][] = [];

    data.map((item, index) => {
      // api dan 5 günlük veri geliyor. Ben bunları bugün ve diğer günler olarak ayırıyorum.
      // Tüm günler 8 item içeren arraylerden oluşurken genelde ilk ve son gün 8 itemdan oluşmuyor.
      // İlk günün eksiklerini 2. günün ilk indexleriyle, son günü ise sondan bir önceki günün son indexleriyle tamamlıyorum
      if (index === 0) {
        if (item.length < 8) {
          // 8 den azsa sonraki günden tamamla
          todayArr.push(...item);
          for (let i = 0; i < data[index + 1].length - item.length; i++) {
            todayArr.push(data[index + 1][i]);
          }
        } else {
          // 8 ise tüm datayı at
          todayArr.push(...item);
        }
      } else {
        otherDaysArr.push(item);
        if (index === 5) {
          const fifthItemsLen = item.length;
          const forthItemsLen = data[index - 1].length;
          for (let i = -1; i >= fifthItemsLen - forthItemsLen; i--) {
            otherDaysArr[otherDaysArr.length - 1].unshift(
              data[index - 1][otherDaysArr.length - 1]
            );
          }
        }
      }
    });
    const result: [ListAPIRes[], ListAPIRes[][]] = [todayArr, otherDaysArr];
    return result;
  }

  return setDays(convertData());
}
