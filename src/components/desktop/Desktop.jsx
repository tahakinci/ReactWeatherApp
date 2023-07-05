import iconObj from "../../constants/iconObj";
import { useState, useEffect } from "react";
import Forecast from "./Forecast";
import Charts from "../Charts";
import Map from "../Map";
import OtherCitiesDesktop from "./OtherCitiesDesktop";
import DesktopNavbar from "./DesktopNavbar";

const Desktop = ({ list = [], city, handleSearch, otherCityData }) => {
  const [today, setToday] = useState([]);
  const [otherDays, setOtherDays] = useState([]);

  useEffect(() => {
    setDays(convertData());
  }, [city]);
  // List prop is list of weather data for every three hours. It contains 40 items.
  // convertData function seperates 40 item to days
  const convertData = () => {
    const seperatedDays = {};
    if (list) {
      list.map((item) => {
        const dateStr = item.dt_txt.split(" ")[0];
        const date = new Date(dateStr);
        if (!seperatedDays[date]) {
          seperatedDays[date] = [];
        }
        seperatedDays[date].push(item);
      });
      const arr = [];
      Object.entries(seperatedDays).map((item) => {
        arr.push(item[1]);
      });
      return arr;
    }
    return [];
  };

  function setDays(data) {
    let todayArr = [];
    let otherDaysArr = [];
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
            otherDaysArr.at(-1).unshift(data[index - 1].at(i));
          }
        }
      }
    });
    setToday(todayArr);
    setOtherDays(otherDaysArr);
  }

  return (
    <div className="m-auto min-h-screen w-[80%] rounded-3xl bg-black">
      <DesktopNavbar city={city} handleSearch={handleSearch} />
      <div className="grid grid-cols-1 gap-5 px-6 lg:grid-cols-[3fr_1fr] ">
        <div>
          <h2 className="py-2 text-lg">Forecast</h2>
          <Forecast
            today={today}
            otherDays={otherDays}
            icon={iconObj[list[0]?.weather[0]?.icon]}
            city={city}
          />
        </div>
        <Charts weather={today} />
        <div className="max-h-[300px]">
          <h2 className="py-2 text-lg">Global Map </h2>
          <Map data={otherCityData} />
        </div>
        <div>
          <h2 className="py-2 text-lg">Other Cities</h2>
          <div className="max-h-[300px] overflow-y-scroll">
            {otherCityData.map((city) => (
              <OtherCitiesDesktop
                data={city}
                key={city.name}
                icon={iconObj[city?.weather[0]?.icon]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
