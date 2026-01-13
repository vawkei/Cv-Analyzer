import type React from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type: "submit" | "button";
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${classes.button} ${props.className || ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
