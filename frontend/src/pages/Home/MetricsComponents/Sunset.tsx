import Card from "../../../components/Card";
import { FiSunset } from "react-icons/fi";
import { City } from "../../../types";
import dayjs from "dayjs";
import { useLayoutEffect, useRef, useState } from "react";
import {
  getTheLightSource,
  isNight,
  mapCurrentTimeAsDegree,
} from "../../../utils/arcCalculations";
import utc from "dayjs/plugin/utc";

type Props = {
  data: City;
};

// gün çizelgesinin altına akşam cizelgesinin üstüne kaç saat gün kaç saat gece olduğu yazılacak
// footer kısmına gün doğumuna veya batımına ne kadar kaldığı yazılacak
// çizelgede gün doğuş ve batış kısmının üstüne gelindiğinde saatleri gösterilecek
// gündüz güneş akşam ay simgesi olacak
// gün batımı - gün doğumu *100/24 ile günün gündüz oranı bulunur
// ekran boyutları değiştiğinde çember bozuluyor
// gündüz oranı ile gündüz kuşağının width hesaplanır. Hesaplanan widthin yarısı height değerini verir
// Büyük ihtimal gün batımından sonra rerender olmazsa güneş gözükmeye devam edecek ona bir bak!

const Sunset = ({ data }: Props) => {
  const [dayZoneHeight, setDayZoneHeight] = useState(0);
  const [nightZoneHeight, setNightZoneHeight] = useState(0);
  const dayZoneRef = useRef<HTMLDivElement>(null);
  const nightZoneRef = useRef<HTMLDivElement>(null);
  const dayTime =
    (dayjs
      .unix(data.sunset - data.sunrise)
      .utc()
      .hour() *
      100) /
    24;
  const sunrise = dayjs.unix(data.sunrise + data.timezone).utc();
  const sunset = dayjs.unix(data.sunset + data.timezone).utc();

  dayjs.extend(utc);

  const isDay = () => {
    return !isNight(sunrise, sunset, data.timezone);
  };

  const lightSourceCoord = getTheLightSource(
    mapCurrentTimeAsDegree(sunrise, sunset, data.timezone),
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
      styles="grid before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
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
