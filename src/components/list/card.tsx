import { useState, type FC } from "react";
import type { Car } from "../../types";
import { getRentalPrice } from "../../utils/getPrice";
import Info from "./info";
import Button from "../button";
import getImage from "../../utils/getImage";
import Modal from "../modal";

interface Props {
  car: Car;
}

const Card: FC<Props> = ({ car }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="car-card group">
        {/* Marka */}
        <h2 className="car-card-content-title">
          {car.make} {car.model}
        </h2>

        {/* Fiyat */}
        <div className="flex mt-6 text-[19px]">
          <span className="font-semibold">₺</span>
          <span className="text-[32px]">{getRentalPrice(car).dailyPrice}</span>
          <span className="font-semibold self-end">/gün</span>
        </div>

        {/* Resim */}
        <div>
          <img
            src={getImage(car)}
            alt={car.make + " " + car.model}
            className="size-full object-contain min-h-50"
          />
        </div>

        {/* Detaylar */}
        <div className="w-full">
          <div className="group-hover:hidden">
            <Info car={car} />
          </div>

          <div className="hidden group-hover:block">
            <Button
              text="Daha Fazla"
              designs="w-full mt-[0.5px]"
              fn={() => setIsOpen(true)}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} car={car} close={() => setIsOpen(false)} />
    </>
  );
};

export default Card;
