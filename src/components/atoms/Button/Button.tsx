import React from "react";
import "./Button.scss";
import { ButtonProps } from "../../../constant/ButtonProps";

const Button: React.FC<ButtonProps> = ({
  label,
  onClickHandler,
  className,
}) => {
  return (
    <button onClick={onClickHandler} className={className}>
      {label}
    </button>
  );
};

export default Button;
