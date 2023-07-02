import React from "react";

const Charts = ({ weather }) => {
  return (
    <div className="py-2">
      <h3 className="py-2 text-xl">Rain</h3>
      <div className="flex h-[100px] w-full items-end ">
        {weather.map((hour) => (
          <div
            key={hour.dt}
            className="flex h-full grow flex-col items-center justify-end"
          >
            <span className="mb-auto">
              {hour?.rain ? Math.round(hour?.rain["3h"] * 10) : 0}%
            </span>
            <div
              style={{
                height: (hour.rain ? hour.rain["3h"] * 10 : 0) + "%",
              }}
              className="w-full border-t-2 border-blue-500 bg-blue-200 "
            ></div>
            <div>{hour.dt_txt.substring(11, 16)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;
