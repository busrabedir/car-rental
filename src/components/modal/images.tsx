import type { FC } from "react";
import getImage from "../../utils/getImage";
import type { Car } from "../../types";

interface Props {
  car: Car;
}

const Images: FC<Props> = ({ car }) => {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="w-full">
        <img
          src={getImage(car, "1", true)}
          alt={car.make + " " + car.model}
          className="size-full rounded-md object-cover"
        />
      </div>

      <div className="flex gap-3 my-3">
        <div className="rounded flex-1 flex relative h-30 bg-primary-blue-100">
          <img
            src={getImage(car, "29", undefined, true)}
            alt={car.make + " " + car.model + "front"}
            className="mx-auto object-contain"
          />
        </div>
        <div className="rounded flex-1 flex relative h-30 bg-primary-blue-100">
          <img
            src={getImage(car, "33", undefined, true)}
            alt={car.make + " " + car.model + "top"}
            className="mx-auto object-contain"
          />
        </div>
        <div className="rounded flex-1 flex relative h-30 bg-primary-blue-100">
          <img
            src={getImage(car, "13", undefined, true)}
            alt={car.make + " " + car.model + "back"}
            className="mx-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Images;
