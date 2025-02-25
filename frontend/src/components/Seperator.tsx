type Props = {
  content: string;
};

const Seperator = ({ content }: Props) => {
  return (
    <div className="flex items-center w-full my-4">
      <div className="flex-1 border-t border-gray-300"></div>
      <span className="px-4 text-gray-500 text-sm">{content}</span>
      <div className="flex-1 border-t border-gray-300"></div>
    </div>
  );
};

export default Seperator;
