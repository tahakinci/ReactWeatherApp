import WeeklyForecast from "./WeeklyForecast";
import WeatherTab from "./WeatherTab";
import Navbar from "./Navbar";
import OtherCities from "./OtherCities";
import { useState, useEffect } from "react";
import iconObj from "../../constants/iconObj";

const Mobile = ({ list = [], city, handleSearch, otherCityData }) => {
  const [today, setToday] = useState([]);
  const [otherDays, setOtherDays] = useState([]);
  const [mode, setMode] = useState({
    home: true,
    search: false,
    forecast: false,
    darkMode: true,
  });

  const TODO = (value) => {
    setMode(value);
  };

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

  if (mode.home) {
    return (
      <>
        <WeatherTab
          todayWeather={today}
          city={[city?.country, city?.name]}
          icon={iconObj[list[0]?.weather[0]?.icon]}
        />
        <Navbar TODO_={TODO} />
      </>
    );
  } else if (mode.search) {
    return (
      <>
        <OtherCities data={otherCityData} handleSearch={handleSearch} />
        <Navbar TODO_={TODO} />
      </>
    );
  } else if (mode.forecast) {
    return (
      <>
        <WeeklyForecast todayWeather={today} weeklyWeather={otherDays} />
        <Navbar TODO_={TODO} />
      </>
    );
  }

  return (
    <>
      {/* 
     
     */}
    </>
  );
};

export default Mobile;
