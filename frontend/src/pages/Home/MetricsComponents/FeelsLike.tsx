import { FaTemperatureHigh } from "react-icons/fa";
import Card from "../../../components/Card";
import { List } from "../../../types";
type Props = {
  data: List;
};

const FeelsLike = ({ data }: Props) => {
  return (
    <Card
      icon={<FaTemperatureHigh />}
      styles="grid before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="FEELS LIKE"
    >
      <div>
        {Math.round(data.main?.feels_like)}°
        <p>Actual: {Math.round(data.main.temp)}°</p>
      </div>
    </Card>
  );
};

export default FeelsLike;
