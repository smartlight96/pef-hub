type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          px-5
          py-4
          outline-none
          focus:border-orange-500
        "
      />
    </div>
  );
}
