import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function ModeButton({ toggleDevice }: { toggleDevice: () => void }) {
  const [mode, setMode] = useState(true);

  return (
    <div className="absolute rounded-[2rem] bg-[#222248] text-[2rem] md:text-[1rem]">
      <button
        onClick={() => {
          setMode(() => !mode);
          toggleDevice();
        }}
        className="hidden h-[50px] w-[50px]  cursor-pointer rounded-full border-none bg-indigo-800 object-contain p-3 text-center lg:inline"
      >
        <div className="relative transition-all duration-500 hover:[transform:rotateY(180deg)]">
          {mode ? (
            <FontAwesomeIcon icon={faDesktop} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faMobile} size="lg" />
          )}
        </div>
      </button>
    </div>
  );
}
