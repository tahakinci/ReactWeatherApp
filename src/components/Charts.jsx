import React from "react";

const Charts = ({ weather }) => {
  return (
    <div>
      {weather.map((hour) => (
        <div key={hour.dt}>
          <div
            style={{ height: (hour.rain ? hour.rain["3h"] * 100 : 0) + "%" }}
          >
            RainPre
          </div>
          <div>{hour.dt_txt.substring(11, 16)}</div>
        </div>
      ))}
    </div>
  );
};

export default Charts;
