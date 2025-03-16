import Card from "../../../components/Card";
import { FiSunset } from "react-icons/fi";
import { City, List } from "../../../types";
import dayjs from "dayjs";
import { useLayoutEffect, useRef, useState } from "react";
import {
  getTheLightSource,
  isNight,
  mapCurrentTimeAsDegree,
} from "../../../utils/arcCalculations";
import utc from "dayjs/plugin/utc";

type Props = {
  data: List;
  cityData: City;
};

// gün çizelgesinin altına akşam cizelgesinin üstüne kaç saat gün kaç saat gece olduğu yazılacak
// footer kısmına gün doğumuna veya batımına ne kadar kaldığı yazılacak
// çizelgede gün doğuş ve batış kısmının üstüne gelindiğinde saatleri gösterilecek
// gündüz güneş akşam ay simgesi olacak
// gün batımı - gün doğumu *100/24 ile günün gündüz oranı bulunur
// ekran boyutları değiştiğinde çember bozuluyor
// gündüz oranı ile gündüz kuşağının width hesaplanır. Hesaplanan widthin yarısı height değerini verir
// Büyük ihtimal gün batımından sonra rerender olmazsa güneş gözükmeye devam edecek ona bir bak!

const Sunset = ({ data, cityData }: Props) => {
  const [dayZoneHeight, setDayZoneHeight] = useState(0);
  const [nightZoneHeight, setNightZoneHeight] = useState(0);
  const dayZoneRef = useRef<HTMLDivElement>(null);
  const nightZoneRef = useRef<HTMLDivElement>(null);
  const dayTime =
    (dayjs
      .unix(cityData.sunset - cityData.sunrise)
      .utc()
      .hour() *
      100) /
    24;
  const sunrise = dayjs.unix(cityData.sunrise + cityData.timezone).utc();
  const sunset = dayjs.unix(cityData.sunset + cityData.timezone).utc();
  const now = dayjs.unix(data.dt).utc();
  dayjs.extend(utc);

  const isDay = () => {
    return !isNight(sunrise, sunset, now);
  };

  const lightSourceCoord = getTheLightSource(
    mapCurrentTimeAsDegree(sunrise, sunset, now),
    isDay()
  );

  useLayoutEffect(() => {
    const dayZoneWidth = dayZoneRef.current
      ? dayZoneRef.current.offsetWidth
      : 0;
    const nightZoneWidth = nightZoneRef.current
      ? nightZoneRef.current.offsetWidth
      : 0;

    setDayZoneHeight(dayZoneWidth / 2);
    setNightZoneHeight(nightZoneWidth / 2);
  });

  return (
    <Card
      icon={<FiSunset />}
      styles="grid before:col-start-1 opacity-[0.8] before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="SUNSET"
    >
      <div className="flex h-full flex-col justify-between">
        <p>{sunrise.format("HH:mm")}</p>
        <div className="relative w-full h-1 bg-black">
          <div
            ref={dayZoneRef}
            style={{ width: dayTime + "%", height: dayZoneHeight + "px" }}
            className={"absolute bg-red-400 left-0 bottom-full rounded-t-full"}
          >
            <div
              id="sun"
              className="w-1 h-1 bg-green-400 absolute"
              style={{
                left: lightSourceCoord.x + "%",
                bottom: lightSourceCoord.y + "%",
                display: isDay() ? "block" : "none",
              }}
            ></div>
          </div>
          <div
            ref={nightZoneRef}
            style={{
              width: 100 - dayTime + "%",
              height: nightZoneHeight + "px",
            }}
            className="absolute bg-yellow-400 right-0 top-full rotate-180 rounded-t-full"
          >
            <div
              id="moon"
              className="w-1 h-1 bg-white absolute"
              style={{
                left: lightSourceCoord.x + "%",
                bottom: lightSourceCoord.y + "%",
                display: isDay() ? "none" : "block",
              }}
            ></div>
          </div>
        </div>
        <p>{sunset.format("HH:mm")}</p>
      </div>
    </Card>
  );
};

export default Sunset;
