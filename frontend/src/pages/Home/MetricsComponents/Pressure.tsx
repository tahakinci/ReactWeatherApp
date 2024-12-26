import Card from "../../../components/Card";
import { WiBarometer } from "react-icons/wi";
import { List } from "../../../types";

type Props = {
  data: List;
};

const Pressure = ({ data }: Props) => {
  return (
    <Card
      icon={<WiBarometer />}
      styles="grid before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="PRESSURE"
    >
      <div>{data.main.pressure}</div>
    </Card>
  );
};

export default Pressure;
