import { ReactElement } from "react";

type Props = {
  icon?: ReactElement;
  header?: string;
  children: JSX.Element;
  footer?: string;
  styles: string;
};

const Card = ({ icon, header, children, footer, styles }: Props) => {
  return (
    <div className={`${styles} text-white`}>
      <div className="bg-slate-700 p-3 rounded-2xl flex flex-col justify-between col-start-1 col-end-2 row-start-1 row-end-2 w-[100%] ">
        <div className="flex font-poppins px-2 gap-2 items-center">
          {icon}
          <h2 className="font-bold">{header}</h2>
        </div>
        <div className="grow">{children}</div>
        <div className="subtext text-sm font-light">
          <p>{footer}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
