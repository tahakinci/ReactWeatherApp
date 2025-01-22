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
      <div className="flex flex-col justify-between h-full">
        <p>{data.main.sea_level}</p>
        <div className="flex-grow content-center">
          <div className="flex w-full h-full items-end justify-center relative">
            <div className="bg-blue-500 w-[40%] h-[20%]"></div>
            {/* <div
              id="sea"
              className="bg-pink-500 h-[20%] w-12 relative after:w-[100%] after:h-[100%] after:bg-red-500 after:absolute after:rounded-br-full after:top-0 before:w-[100%] before:h-[100%] before:bottom-0 before:bg-blue-500 before:absolute before:rounded-tl-full"
            ></div> */}
            <div
              id="mountain"
              className="w-24 h-32 bg-transparent absolute left-[35%] z-10 border-none m-0 p-0"
            >
              <div className="relative w-full h-full border-none m-0 p-0">
                <div className="mountain relative w-full h-full bg-orange-800 border-none  m-0 p-0">
                  <div className="w-full h-1/4 flex border-none  m-0 p-0">
                    <div className="relative w-1/2 h-full bg-white border-none">
                      <div className="w-[40%] absolute bottom-0 right-0 h-1/4 bg-orange-800 border-none m-0 p-0">
                        <div className="v-cut absolute right-0 bottom-0 w-1/2 h-full text-right bg-white border-none m-0 p-0"></div>
                      </div>
                    </div>
                    <div className="relative w-1/2 h-full bg-white border-none m-0 p-0">
                      <div className="w-[40%] absolute bottom-0 left-0 h-1/4 bg-orange-800 border-none m-0 p-0">
                        <div className="v-cut  w-1/2 h-full bg-white border-none m-0 p-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="ground" className="bg-yellow-400 w-[50%] h-[15%]"></div>
          </div>
        </div>
        <p>{data.main.grnd_level}</p>
      </div>
    </Card>
  );
};

export default GroundLevel;
