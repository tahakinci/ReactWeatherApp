import { FaSnowflake, FaCloudRain } from "react-icons/fa";

type Props = {
  precipitation: number | undefined;
  type: string;
};

const Precipitation = ({ precipitation = 0, type }: Props) => {
  return (
    <div
      className="flex flex-col justify-center
     items-center"
    >
      {type === "snow" && <FaSnowflake />}
      {type === "rain" && <FaCloudRain />}
      <p className="text-sky-400">{((precipitation * 100) / 3).toFixed(0)}%</p>
    </div>
  );
};

export default Precipitation;
