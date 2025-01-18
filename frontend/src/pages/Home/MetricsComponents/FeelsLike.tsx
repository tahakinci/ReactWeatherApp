import { FaTemperatureHigh } from "react-icons/fa";
import Card from "../../../components/Card";
import { List } from "../../../types";
import { tempVariant } from "../../../utils/weatherMetricHelpers";
type Props = {
  data: List;
};

const FeelsLike = ({ data }: Props) => {
  const feelsLike = Math.round(data.main?.feels_like);
  const actual = Math.round(data.main.temp);

  const footer = tempVariant(actual, feelsLike);

  return (
    <Card
      icon={<FaTemperatureHigh />}
      styles="grid before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="FEELS LIKE"
      footer={footer.message}
    >
      <div>
        {feelsLike}°
        <div className="flex justify-between">
          <p>Actual: {actual}°</p>
          <div></div>
        </div>
      </div>
    </Card>
  );
};

export default FeelsLike;
