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
    <div className={`${styles}`}>
      <div className="bg-slate-400 p-3 rounded-2xl flex flex-col justify-between col-start-1 col-end-2 row-start-1 row-end-2 w-[100%] ">
        <div id="card-header" className="flex px-2 gap-2 items-center">
          {icon}
          <p>{header}</p>
        </div>
        <div className="grow" id="card-content">
          {children}
        </div>
        <div id="card-footer">
          <p>{footer}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
