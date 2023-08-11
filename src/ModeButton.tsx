import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faDesktop } from "@fortawesome/free-solid-svg-icons";

export function ModeButton({ toggleDevice }: { toggleDevice: () => void }) {
  return (
    <div className="absolute rounded-[2rem] bg-[#222248] text-[2rem] md:text-[1rem]">
      <button
        onClick={toggleDevice}
        className="border-non hidden h-[50px] w-[50px] cursor-pointer rounded-full bg-indigo-800 object-contain p-3 text-center lg:inline"
      >
        <FontAwesomeIcon icon={faDesktop} size="lg" />
      </button>
      <button className="h-[50px] w-[50px] cursor-pointer rounded-full border-none  object-contain text-center">
        <FontAwesomeIcon icon={faMobile} size="lg" />
      </button>
    </div>
  );
}
