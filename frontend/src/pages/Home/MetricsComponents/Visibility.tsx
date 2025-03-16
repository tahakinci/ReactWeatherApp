import Card from "../../../components/Card";
import { MdVisibility } from "react-icons/md";
import { List } from "../../../types";

type Props = {
  data: List;
};

const Visibility = ({ data }: Props) => {
  return (
    <Card
      icon={<MdVisibility />}
      styles="grid before:col-start-1 opacity-[0.8] before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="VISIBILITY"
    >
      <div>{data.visibility / 1000} km</div>
    </Card>
  );
};

export default Visibility;
