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
        <button className="p-2" type="submit">
          ara
        </button>
        <input className="flex-grow p-2" name="searchInput" />
      </form>
    </div>
  );
};

export default SearchInput;
