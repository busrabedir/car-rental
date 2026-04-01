import { useMemo, useState, type FC, type FormEvent } from "react";
import ReactSelect from "react-select";
import { makes, selectStyles } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";

const Searchbar: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [make, setMake] = useState<string>(searchParams.get("make") || "");
  const [model, setModel] = useState<string>(searchParams.get("model") || "");

  // form gönderilince çalışır
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (make) {
      searchParams.set("make", make);
    } else {
      searchParams.delete("make");
    }

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  // makes dizisini react-select'in istediği formata çevir
  const options = useMemo(
    () => makes.map((make) => ({ label: make, value: make })),
    [],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="searchbar flex gap-4 items-start justify-center"
    >
      {/* Marka */}
      <div className="searchbar-item items-end">
        <div className="w-full flex flex-col z-2">
          <label htmlFor="marka" className="font-semibold mb-2 text-sm">
            Marka
          </label>

          <ReactSelect
            inputId="marka"
            styles={selectStyles}
            options={options}
            value={make ? { label: make, value: make } : null}
            onChange={(e) => setMake(e?.value as string)}
            placeholder="Marka"
          />
        </div>

        <button
          type="submit"
          className="mb-1 search-btn sm:hidden"
          aria-label="ara"
        >
          <img src="/search.svg" className="size-6" alt="ara" />
        </button>
      </div>

      {/* Model */}
      <div className="searchbar-item items-start flex flex-col">
        <label htmlFor="model" className="font-semibold mb-2 text-sm">
          Model
        </label>

        <div className="w-full flex items-center">
          <div className="relative flex-1">
            <img
              src="/model-icon.png"
              className="size-6 absolute left-8 top-1/2 -translate-1/2 z-1"
              alt="model icon"
            />
            <input
              type="text"
              id="model"
              className="searchbar-input"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Model"
            />
          </div>

          <button type="submit" className="mb-1 search-btn" aria-label="ara">
            <img src="/search.svg" className="size-6" alt="ara" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
