import Card from "../../../components/Card";
import { FiSunset } from "react-icons/fi";
import { City } from "../../../types";

type Props = {
  data: City;
};

const Sunset = ({ data }: Props) => {
  return (
    <Card
      icon={<FiSunset />}
      styles="grid before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="SUNSET"
    >
      <div>
        <p>{data.sunrise}</p>
        <p>{data.sunset}</p>
      </div>
    </Card>
  );
};

export default Sunset;
