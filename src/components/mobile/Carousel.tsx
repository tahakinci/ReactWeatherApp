import { useState, useRef, MutableRefObject } from "react";
import CarouselContent from "./CarouselContent";
import iconObj from "../../utils/iconObj";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ListAPIRes } from "../../WeatherAPIResponseTypes";

type CarouselPropsType = {
  data: ListAPIRes[];
  unit: string;
};

const Carousel = ({ data, unit }: CarouselPropsType) => {
  const [curr, setCurr] = useState(0);
  const element = useRef() as MutableRefObject<HTMLDivElement>;

  const prev = () =>
    setCurr((curr) => (curr === 0 ? data.length - 2 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === data.length - 2 ? 0 : curr + 1));

  return (
    <div className="py-2">
      <h3 className="py-2 text-xl">Today</h3>
      <div className="relative flex">
        <div
          className="me-auto mt-2 flex transition-transform duration-500 ease-out"
          ref={element}
          style={{ transform: `translateX(-${curr * 11}%)` }}
        >
          {data.map((hour, index) => (
            <CarouselContent
              id={index}
              data={hour}
              icon={iconObj[hour.weather[0].icon]}
              key={hour.dt}
              unit={unit}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-between">
          <button
            onClick={prev}
            className="w-10 rounded-full  bg-white/80 p-1 text-black shadow hover:bg-indigo-700 hover:text-white"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={next}
            className="w-10 rounded-full bg-white/80 p-1 text-black shadow hover:bg-indigo-700 hover:text-white"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
