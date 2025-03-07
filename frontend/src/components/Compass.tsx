import { useLayoutEffect, useRef, useState } from "react";
type Props = {
  type: "compass" | "barometer";
};

const Compass = ({ type }: Props) => {
  const [circleDiametre, setCircleDiametre] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const containerWidth = ref.current?.offsetWidth ?? 0;
    const containerHeight = ref.current?.offsetHeight ?? 0;

    const circleDiametre =
      containerWidth > containerHeight ? containerHeight : containerWidth;
    setCircleDiametre(circleDiametre);
  });
  return (
    <div
      className="flex justify-center relative h-full w-1/2 items-center"
      ref={ref}
    >
      {/* daha sonrasında bunu bir component yap ve çubuk sayısını belirleyebil ORN: saat için kullanmak isteyen her bir sayının arsına 4 küçük çubuk koyarken basınç için 10 tane koyabilsin */}
      <div
        style={{ width: circleDiametre, height: circleDiametre }}
        id="circle"
        className="flex relative justify-center items-center rounded-full  "
      >
        <span className="absolute text-center top-0">N</span>
        <span className="absolute right-0">E</span>
        <span className="absolute left-0 ">W</span>
        <span className="absolute text-center bottom-0">S</span>
        <div className=" flex justify-center items-center w-[75%] h-[75%] rounded-full bg-yellow-500 ">
          <div
            id="arrow"
            className="w-1 h-full rounded-2xl rotate-[211deg] relative bg-green-400 before:w-0 before:h-0 before:border-l-[5px] before:border-l-transparent before:border-r-[5px] before:border-r-transparent before:border-t-[12px] before:border-t-black before:-bottom-[3px] before:-left-[3px] before:absolute "
          ></div>
        </div>
        {Array.from({ length: 60 }).map((_, index) => {
          const obj = {
            value: index + 1,
            name: "",
            border: 0,
          };
          if (obj.value === 5 || obj.value % 5 === 0) {
            obj.border = 2;
          } else if (
            obj.value % 5 !== 0 &&
            ![15, 30, 45, 60].includes(obj.value)
          ) {
            obj.border = 1;
          }

          return (
            <span
              className="absolute inset-2 text-center"
              style={{ transform: `rotate(${6 * obj.value}deg)` }}
              key={index}
            >
              <b
                className="inline-block rounded"
                style={{
                  transform: `rotate(${-6 * obj.value}deg)`,
                  border: `${obj.border}px solid blue`,
                }}
              >
                {obj.name}
              </b>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Compass;
