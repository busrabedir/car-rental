import { useState, type FC, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

const Year: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [year, setYear] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (year) {
      searchParams.set("year", year);
    } else {
      searchParams.delete("year");
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="yıl" className="font-semibold mb-2 text-sm">
        Yıl
      </label>

      <div className="flex items-center">
        <input
          type="text"
          id="yıl"
          className="w-32 rounded-l-2xl input-bg"
          placeholder="örn:2026"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button
          className="input-bg rounded-r-2xl cursor-pointer"
          aria-label="ara"
        >
          <img src="/search.svg" className="size-5" alt="ara" />
        </button>
      </div>
    </form>
  );
};

export default Year;
