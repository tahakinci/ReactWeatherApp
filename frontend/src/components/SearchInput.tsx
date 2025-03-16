import { BiSearchAlt } from "react-icons/bi";

type Props = {
  onSubmit: (data: string) => void;
  className?: string;
};

const SearchInput = ({ onSubmit, className }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newValue = formData.get("searchInput") as string;
    onSubmit(newValue);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex">
        <button
          className="p-2 hover:scale-125 text-gray-200 bg-gray-700 rounded-md rounded-r-none"
          type="submit"
        >
          <BiSearchAlt />
        </button>
        <input
          className="flex-grow p-2 placeholder:text-gray-500 rounded-md rounded-l-none bg-gray-700 text-gray-200 focus:bg-gray-600 border-gray-600 focus:border-blue-500"
          name="searchInput"
        />
      </form>
    </div>
  );
};

export default SearchInput;
