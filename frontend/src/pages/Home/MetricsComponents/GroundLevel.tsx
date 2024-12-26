import Card from "../../../components/Card";
import { SiLevelsdotfyi } from "react-icons/si";
import { List } from "../../../types";

type Props = {
  data: List;
};

const GroundLevel = ({ data }: Props) => {
  return (
    <Card
      icon={<SiLevelsdotfyi />}
      styles="grid before:col-start-1 before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="GROUND LEVEL"
    >
      <div>
        <p>{data.main.sea_level}</p>
        <p>{data.main.grnd_level}</p>
      </div>
    </Card>
  );
};

export default GroundLevel;
