import Card from "../../../components/Card";
import { FiSunset } from "react-icons/fi";
import { City, List } from "../../../types";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import {
  asMinute,
  convertMinutesToTime,
  getTheLightSource,
  isNight,
  mapCurrentTimeAsDegree,
  timeUntilEvent,
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
  dayjs.extend(utc);
  const sunrise = dayjs.unix(cityData.sunrise + cityData.timezone).utc();
  const sunset = dayjs.unix(cityData.sunset + cityData.timezone).utc();
  const now = dayjs.unix(data.dt).utc();

  const isDay = () => {
    return !isNight(sunrise, sunset, now);
  };

  const lightSourceCoord = getTheLightSource(
    mapCurrentTimeAsDegree(sunrise, sunset, now),
    isDay()
  );

  useEffect(() => {
    const dayZoneWidth = dayZoneRef.current
      ? dayZoneRef.current.offsetWidth
      : 0;
    const nightZoneWidth = nightZoneRef.current
      ? nightZoneRef.current.offsetWidth
      : 0;

    setDayZoneHeight(dayZoneWidth / 2);
    setNightZoneHeight(nightZoneWidth / 2);
  }, []);

  return (
    <Card
      icon={<FiSunset />}
      styles="grid before:col-start-1 opacity-[0.8] before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="SUNSET"
      footer={timeUntilEvent(sunset, sunrise, now)}
    >
      <div className="flex h-full flex-col justify-between">
        <p className="pt-2 text-lg">
          <span className="font-bold">Sunrise</span>: {sunrise.format("HH:mm")}
        </p>
        <div className="relative w-full h-[1px] bg-white">
          <div
            ref={dayZoneRef}
            style={{ width: dayTime + "%", height: dayZoneHeight + "px" }}
            className={
              "absolute flex justify-center items-end border-t-4 border-gray-200 left-0 bottom-full rounded-t-full"
            }
          >
            <p className="text-xs">
              {convertMinutesToTime(
                asMinute(sunset) - asMinute(sunrise),
                true,
                "."
              )}
            </p>
            <div
              id="sun"
              className="w-6 h-6  absolute"
              style={{
                left: lightSourceCoord.x + "%",
                bottom: lightSourceCoord.y - 10 + "%",
                display: isDay() ? "block" : "none",
              }}
            >
              <img src="/assets/10d.png" alt="" />
            </div>
          </div>
          <div
            ref={nightZoneRef}
            style={{
              width: 100 - dayTime + "%",
              height: nightZoneHeight + "px",
            }}
            className="absolute flex justify-center items-end border-t-4 border-gray-900 right-0 top-full rotate-180 rounded-t-full"
          >
            <p className="text-xs rotate-180">
              {convertMinutesToTime(
                24 * 60 - (asMinute(sunset) - asMinute(sunrise)),
                true,
                "."
              )}
            </p>
            <div
              id="moon"
              className="w-6 h-6 absolute"
              style={{
                left: lightSourceCoord.x + "%",
                bottom: lightSourceCoord.y - 10 + "%",
                display: isDay() ? "none" : "block",
              }}
            >
              {" "}
              <img src="/assets/1n.png" alt="asd" />
            </div>
          </div>
        </div>
        <p className="pb-2 text-lg">
          <span className="font-bold">Sunrise</span>: {sunset.format("HH:mm")}
        </p>
      </div>
    </Card>
  );
};

export default Sunset;
