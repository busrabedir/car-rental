import type { FC } from "react";

interface Props {
  text: string;
  designs?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fn?: () => void;
}

const Button: FC<Props> = ({ text, designs, disabled, type, fn }) => {
  return (
    <button
      className={`custom-btn ${designs}`}
      disabled={disabled}
      type={type}
      onClick={fn}
    >
      {text}
    </button>
  );
};

export default Button;
