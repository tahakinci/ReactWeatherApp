type Props = {
  children: JSX.Element[];
};

const Carousel = ({ children }: Props) => {
  return (
    <div id="container" className="grid place-items-center flex-grow">
      <div
        id="slider-container"
        className="w-full relative overflow-hidden p-6"
      >
        <span
          style={{ display: children.length ? "" : "none" }}
          id="right-arrow"
          className="absolute top-[50%] h-2 w-2 border-l-2 border-l-black border-t-2 border-t-black cursor-pointer hover:scale-[1.2] rotate-[-45deg] left-[10px]"
        ></span>
        <div id="slider" className="flex w-[1000%] h-full transition-all">
          {children}
        </div>
        <span
          style={{ display: children.length ? "" : "none" }}
          id="left-arrow"
          className="absolute top-[50%] h-2 w-2 border-l-2 border-l-black border-t-2 border-t-black cursor-pointer hover:scale-[1.2] rotate-[135deg] right-[10px]"
        ></span>
      </div>
    </div>
  );
};

export default Carousel;
