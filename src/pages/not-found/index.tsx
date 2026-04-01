import type { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="my-80 grid place-items-center gap-10">
      <h1 className="text-5xl">404</h1>

      <p className="text-xl">Aradığınız içerik bulunamadı</p>

      <Link
        to="/"
        className="px-4 py-2 rounded border hover:bg-zinc-100/20 transition"
      >
        Anasayfa'ya Dön
      </Link>
    </div>
  );
};

export default NotFound;
