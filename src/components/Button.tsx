import { ButtonHTMLAttributes } from "react";
import { ButtonStyled } from "../styles/Button.style";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <ButtonStyled className="button" {...props} />;
}
