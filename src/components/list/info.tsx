import type { FC } from "react";
import type { Car } from "../../types";
import { driveOptions } from "../../utils/constants";
import { motion } from "motion/react";

interface Props {
  car: Car;
}

const Info: FC<Props> = ({ car }) => {
  // ekrana basılacak bilgiler
  const arr = [
    {
      icon: "/steering-wheel.svg",
      text: car.trany.includes("Auto") ? "Auto" : "Manuel",
    },
    { icon: "/tire.svg", text: driveOptions[car.drive] },
    { icon: "/calendar.svg", text: car.year },
  ];

  // animasyon ayarları
  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },

    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="flex-between">
      {arr.map((item, key) => (
        <motion.div
          key={key}
          custom={key}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: key * 0.1 }}
          variants={variants}
          className="flex-center flex-col gap-1"
        >
          <img src={item.icon} alt={item.text} width={25} height={25} />
          <p>{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Info;
