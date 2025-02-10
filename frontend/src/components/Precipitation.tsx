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
      {precipitation * 100}%
    </div>
  );
};

export default Precipitation;
