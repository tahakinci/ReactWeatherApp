import Card from "../../../components/Card";
import { SiLevelsdotfyi } from "react-icons/si";
import { List } from "../../../types";
import { pressureToAltitude } from "../../../utils/converters";

type Props = {
  data: List;
};

const GroundLevel = ({ data }: Props) => {
  const groundLvl = pressureToAltitude(
    data.main.grnd_level,
    data.main.sea_level
  );
  const getGroundLocation = () => {
    if (groundLvl > 0)
      return {
        value: "1/4",
        message: `The city is ${groundLvl} meters above sea level.`,
      };
    else if (groundLvl === 0)
      return {
        value: "1/5",
        message: `The city is ${groundLvl} metres below sea level`,
      };
    return { value: "1/6", message: "The city at sea level" };
  };
  return (
    <Card
      icon={<SiLevelsdotfyi />}
      styles="grid before:col-start-1 opacity-[0.8] before:col-end-2 before:row-start-1 before:row-end-2 before:content-[''] before:block before:pt-[100%]"
      header="GROUND LEVEL"
      footer={getGroundLocation().message}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow content-center w-full">
          <div className=" w-full h-full relative">
            <div
              id="sea"
              className="bg-blue-500 w-[45%] h-[20%] text-center absolute bottom-0 left-0 bg-gradient-to-b from-cyan-400 to-blue-800"
            >
              <p className="-mt-6">Sea Level</p>
            </div>
            <div
              id="mountain"
              className="w-[30%] h-2/3 bg-transparent absolute bottom-0 left-[35%] z-10 border-none m-0 p-0"
            >
              <div className="relative w-full h-full border-none m-0 p-0">
                <div className="mountain relative w-full h-full bg-gradient-to-b from-slate-600 to-slate-900 border-none  m-0 p-0">
                  <div className="w-full h-1/4 flex border-none  m-0 p-0">
                    <div className="relative w-1/2 h-full bg-white border-none">
                      <div className="w-[40%] absolute bottom-0 right-0 h-1/4 bg-slate-600 border-none m-0 p-0">
                        <div className="v-cut absolute right-0 bottom-0 w-1/2 h-full text-right bg-white border-none m-0 p-0"></div>
                      </div>
                    </div>
                    <div className="relative w-1/2 h-full bg-white border-none m-0 p-0">
                      <div className="w-[40%] absolute bottom-0 left-0 h-1/4 bg-slate-600 border-none m-0 p-0">
                        <div className="v-cut  w-1/2 h-full bg-white border-none m-0 p-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="ground"
              className={`bg-gradient-to-b from-lime-600 from-10% via-amber-900 via-30% to-amber-950 to-90% w-[45%] h-${
                getGroundLocation().value
              } absolute bottom-0 right-0 text-center`}
            >
              <p className="-mt-6">{groundLvl} m</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GroundLevel;
