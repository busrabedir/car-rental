import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// HOC
const Container: FC<Props> = ({ children }) => {
  return (
    <div className="padding-x max-width">
      <div className="home-error-container my-40">{children}</div>
    </div>
  );
};

export default Container;
