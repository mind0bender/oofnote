import { InputHTMLAttributes, LabelHTMLAttributes, useState } from "react";
import Button from "./Button";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

function Input({ labelProps, type, ...rest }: InputProps): JSX.Element {
  const [visibility, setVisibility] = useState(false);
  return (
    <label
      {...labelProps}
      className={`w-full flex flex-col  items-baseline sm:flex-row border-l-4 pl-2 border-l-stone-700 sm:space-x-2 focus-within:border-l-blue-500 disabled-within:border-l-yellow-500 disabled-within:animate-pulse ${labelProps?.className}`}>
      <span className={`text-nowrap`}>{labelProps?.children}</span>
      <input
        {...rest}
        type={type == "password" ? (visibility ? "text" : "password") : type}
        className={`w-full peer bg-transparent text-stone-50 placeholder:font-light focus:outline-none px-2 py-1 font-mono ${rest.className}`}
      />
      {type == "password" && (
        <Button
          type={"button"}
          onClick={(): void => setVisibility((pV: boolean): boolean => !pV)}
          data-secondary>
          {visibility ? (
            <VisibilityRounded titleAccess={"Hide Password"} />
          ) : (
            <VisibilityOffRounded titleAccess={"Show Password"} />
          )}
        </Button>
      )}
    </label>
  );
}

export default Input;
