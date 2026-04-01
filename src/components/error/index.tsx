import type { FC } from "react";

interface Props {
  message: string;
}

const Error: FC<Props> = ({ message }) => {
  return (
    <div className="text-center space-y-10">
      <h1 className="text-xl">Üzgünüz bir sorun oluştu</h1>
      <p className="text-red-500">{message}</p>
    </div>
  );
};

export default Error;
