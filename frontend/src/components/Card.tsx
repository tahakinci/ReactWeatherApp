type Props = {
  icon?: undefined;
  header?: string;
  children: JSX.Element;
  footer?: string;
  className: string;
};

const Card = ({ icon, header, children, footer, className }: Props) => {
  return (
    <div
      className={`bg-slate-400 p-3 rounded-2xl flex flex-col justify-between ${className}`}
    >
      <div id="card-header" className="flex px-2 gap-2 items-center">
        {icon}
        <p>{header}</p>
      </div>
      <div id="card-content">{children}</div>
      <div id="card-footer">
        <p>{footer}</p>
      </div>
    </div>
  );
};

export default Card;
