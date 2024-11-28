type Props = {
  onSubmit: (data: string) => void;
};

const SearchInput = ({ onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newValue = formData.get("searchInput") as string;
    onSubmit(newValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">ara</button>
        <input name="searchInput" />
      </form>
    </div>
  );
};

export default SearchInput;
