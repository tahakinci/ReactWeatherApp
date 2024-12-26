import { WiHumidity } from "react-icons/wi";
import Card from "../../../components/Card";
import { List } from "../../../types";

type Props = {
  data: List;
};

const Humidity = ({ data }: Props) => {
  return (
    <Card
      icon={<WiHumidity />}
      styles="grid before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="HUMIDITY"
    >
      <div>
        <p>%{data.main.humidity}</p>
      </div>
    </Card>
  );
};

export default Humidity;
