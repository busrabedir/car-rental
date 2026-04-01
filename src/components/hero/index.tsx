import type { FC } from "react";
import Button from "../button";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Hero: FC = () => {
  const count = useMotionValue(1000);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, 1760, { duration: 3 });
    return () => controls.stop();
  }, []);

  return (
    <div className="hero padding-x padding-y">
      <div className="pt-20 xl:flex-1 max-h-230">
        <p className="mb-4 text-xl flex items-center gap-2">
          <motion.pre style={text}>{rounded}</motion.pre>
          <span className="mb-1">+ Araba</span>
        </p>
        <h1 className="hero-title">Özgürlüğü Hisset, Yolculuğa Başla</h1>
        <p className="hero-subtitle">
          Altın standartta hizmetle unutulmaz bir yolculuğa hazır mısın? Araç
          kiralama deneyimini Altın Seçenekleri ile taçlandırarak her anını özel
          kılabilirsin.
        </p>

        <Link to="#catalog">
          <Button text="Arabaları Keşfet" designs="mt-12" />
        </Link>
      </div>

      <div className="flex-centter">
        <motion.img
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          src="/hero.png"
          alt="gri station wagon bmw"
          className="object-contain xl:w-150 xl:h-117.5 drop-shadow-xl"
        />
      </div>
    </div>
  );
};

const text = {
  color: "#06b6d4",
};

export default Hero;
