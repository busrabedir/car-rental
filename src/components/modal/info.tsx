import type { FC } from "react";
import type { Car } from "../../types";
import formatData from "../../utils/format-data";

interface Props {
  car: Car;
}

const Info: FC<Props> = ({ car }) => {
  return (
    <div className="flex flex-col gap-4">
      {formatData(car).map(([key, value]) => (
        <div className="flex justify-between items-center py-3 px-4 glass-dark rounded-xl border border-white/10 overflow-hidden">
          <span className="capitilaze text-grey-light">{key}</span>
          <span className="font-semibold capitalize text-white">
            {value === "T" || value === "Y"
              ? "Var"
              : value === "N"
                ? "Yok"
                : value || "-"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Info;
