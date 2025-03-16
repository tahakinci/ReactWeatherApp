import Card from "../../../components/Card";
import { FiWind } from "react-icons/fi";
import { List } from "../../../types";
import Compass from "../../../components/Compass";

type Props = {
  data: List;
};

const Wind = ({ data }: Props) => {
  return (
    <Card
      icon={<FiWind />}
      styles="grid  col-span-2 before:pt-[50%] opacity-[0.8] before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block"
      header="WIND"
    >
      <div className="flex h-full">
        <div className="w-[50%] flex flex-col justify-around p-2 h-full">
          <div className="flex justify-between  p-2 border-b-gray-400 border-b-2">
            <p>Wind</p>
            <p className="text-gray-300 font-light ">{data.wind.speed} km/h</p>
          </div>
          <div className="flex p-2 justify-between border-b-gray-400 border-b-2">
            <p>Gust</p>
            <p className="text-gray-300 font-light ">{data.wind.gust} km/h</p>
          </div>
          <div className="flex p-2 justify-between border-b-gray-400 border-b-2">
            <p>Direction</p>
            <p className="text-gray-300 font-light ">{data.wind.deg} °</p>
          </div>
        </div>
        <Compass
          degree={data.wind.deg}
          speed={data.wind.speed}
          type="compass"
        />
      </div>
    </Card>
  );
};

export default Wind;
