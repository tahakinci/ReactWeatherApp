import Card from "../../../components/Card";
import { FiWind } from "react-icons/fi";
import { List } from "../../../types";
import Compass from "../../../components/Compass";
import { WiCloudyGusts } from "react-icons/wi";
import { MdSpeed } from "react-icons/md";

type Props = {
  data: List;
};

const Wind = ({ data }: Props) => {
  return (
    <Card
      icon={<FiWind />}
      styles="grid  sm:col-span-1 col-span-2 before:pt-[50%] opacity-[0.8] before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block"
      header="WIND"
    >
      <div className="flex sm:flex-col-reverse flex-row sm:h-fit h-full">
        <div className="sm:w-full w-1/2 flex text-xs sm:flex-row flex-col justify-around p-2 h-full">
          <div className="flex text-center sm:flex-col flex-row items-center justify-between  p-2 border-gray-400 sm:border-t-2 border-none">
            <p className="sm:hidden block">Wind</p>
            <FiWind size={15} className="sm:block hidden" />
            <p className="text-gray-300 font-light ">{data.wind.speed} km/h</p>
          </div>
          <div className="flex text-center sm:flex-col items-center flex-row p-2 justify-between border-gray-400 sm:border-t-2 border-none">
            <p className="sm:hidden block">Gust</p>
            <WiCloudyGusts className="sm:block hidden" size={15} />
            <p className="text-gray-300 font-light ">{data.wind.gust} km/h</p>
          </div>
          <div className="flex text-center sm:flex-col flex-row items-center p-2 justify-between border-gray-400 sm:border-t-2 border-none">
            <p className="sm:hidden block">Direction</p>
            <MdSpeed className="sm:block hidden" size={15} />
            <p className="text-gray-300 flex-1 text-nowrap font-light ">
              {data.wind.deg} °
            </p>
          </div>
        </div>
        <Compass degree={data.wind.deg} speed={data.wind.speed} />
      </div>
    </Card>
  );
};

export default Wind;
