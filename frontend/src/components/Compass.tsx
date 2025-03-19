import { useRef } from "react";

type Props = {
  outerDiameter: number;
  innerDiameter: number;
  precision: number;
  degree: number;
  speed: number;
  mainText: string[];
  mainTextFontSize: number;
};

const Compass = ({
  outerDiameter = 100,
  innerDiameter = 80,
  precision = 3,
  degree = 0,
  speed,
  mainText = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
  mainTextFontSize = 14,
}: Props) => {
  const M = outerDiameter;

  const ticks = [];
  for (let alfa = 0; alfa < 360; alfa += precision) {
    const outerX = M + Math.cos((alfa * Math.PI) / 180) * outerDiameter;
    const outerY = M - Math.sin((alfa * Math.PI) / 180) * outerDiameter;
    const innerX = M + Math.cos((alfa * Math.PI) / 180) * innerDiameter;
    const innerY = M - Math.sin((alfa * Math.PI) / 180) * innerDiameter;
    const middleX =
      M +
      Math.cos((alfa * Math.PI) / 180) *
        (M - (outerDiameter - innerDiameter) / 2);
    const middleY =
      M -
      Math.sin((alfa * Math.PI) / 180) *
        (M - (outerDiameter - innerDiameter) / 2);

    ticks.push(
      <path
        key={alfa}
        stroke="gray"
        d={
          alfa % 5 !== 0
            ? `M ${outerX} ${outerY} L ${middleX} ${middleY}`
            : `M ${outerX} ${outerY} L ${innerX} ${innerY}`
        }
      />
    );
  }

  return (
    <svg className="p-3" viewBox={`0 0 ${M * 2} ${M * 2}`}>
      <defs>
        <filter x="0" y="0" width="1" height="1" id="solid">
          <feFlood floodColor="oklch(0.372 0.044 257.287)" result="bg" />
          <feMerge>
            <feMergeNode in="bg" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={M} cy={M} r={outerDiameter} opacity={0} stroke="black" />
      <circle cx={M} cy={M} r={innerDiameter} opacity={0} stroke="black" />
      {ticks}
      {mainText.map((t, i) => (
        <text
          key={t}
          fontSize={mainTextFontSize}
          className="origin-center"
          style={{ rotate: `${i * 45}deg` }}
          x={M}
          textAnchor="middle"
          dominantBaseline="middle"
          y={2 * (outerDiameter - innerDiameter)}
          fill="gray"
        >
          {t}
        </text>
      ))}
      <g style={{ rotate: `${degree}deg` }} className=" origin-center">
        <polygon
          points={`${M}, ${outerDiameter - innerDiameter} ${M - 10}, ${
            outerDiameter - innerDiameter + 35
          }, ${M - 2.5}, ${outerDiameter - innerDiameter + 25} ${M - 2.5}, ${
            innerDiameter + outerDiameter
          }, ${M + 2.5}, ${innerDiameter + outerDiameter} ${M + 2.5}, ${
            outerDiameter - innerDiameter + 25
          } ${M + 10}, ${outerDiameter - innerDiameter + 35}`}
          fill="white"
          stroke="black"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </g>
      <text
        filter="url(#solid)"
        textAnchor="middle"
        fill="white"
        opacity={1}
        className="z-10"
        dominantBaseline="middle"
        x={M}
        y={M}
      >
        {speed} km/h
      </text>
    </svg>
  );
};

export default Compass;
