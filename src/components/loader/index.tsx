import type { FC } from "react";

const Loader: FC = () => {
  return (
    <div>
      <div className="size-8 rounded-full border-2 border-x-0 border-b-0 border-blue-500 animate-spin" />
    </div>
  );
};

export default Loader;
