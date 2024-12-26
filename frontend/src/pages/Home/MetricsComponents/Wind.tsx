import Card from "../../../components/Card";
import { FiWind } from "react-icons/fi";
import { List } from "../../../types";

type Props = {
  data: List;
};

const Wind = ({ data }: Props) => {
  return (
    <Card
      icon={<FiWind />}
      styles="grid col-span-2 before:pt-[50%] before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block"
      header="WIND"
    >
      <div className="flex">
        <div className="w-[50%]">
          <p>
            Wind <span className="text-right">{data.wind.speed} km/h</span>
          </p>
        </div>
        <div></div>
      </div>
    </Card>
  );
};

export default Wind;
