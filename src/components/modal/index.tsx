import type { FC } from "react";
import type { Car } from "../../types";
import { AnimatePresence, motion } from "motion/react";
import Images from "./images";
import Info from "./info";

interface Props {
  isOpen: boolean;
  close: () => void;
  car: Car;
}

const Modal: FC<Props> = ({ isOpen, close, car }) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 grid place-items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            className="car-details-dialog-panel w-[90%] sm:min-w-150 min-h-[70vh]"
          >
            <button
              onClick={close}
              className="car-details-close-btn cursor-pointer"
              aria-label="modal'ı kapat"
            >
              X
            </button>

            <Images car={car} />

            <Info car={car} />
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
