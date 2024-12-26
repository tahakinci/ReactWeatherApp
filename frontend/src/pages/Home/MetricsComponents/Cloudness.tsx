import Card from "../../../components/Card";
import { WiCloud } from "react-icons/wi";
import { List } from "../../../types";

type Props = {
  data: List;
};

const Cloudness = ({ data }: Props) => {
  return (
    <Card
      icon={<WiCloud />}
      styles="grid before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="CLOUDNESS"
    >
      <div>{data.clouds.all}%</div>
    </Card>
  );
};

export default Cloudness;
