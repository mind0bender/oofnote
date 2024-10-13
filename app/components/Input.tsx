import { InputHTMLAttributes, LabelHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelProps: LabelHTMLAttributes<HTMLLabelElement>;
}

function Input({ labelProps, ...rest }: InputProps): JSX.Element {
  return (
    <label
      {...labelProps}
      className={`flex flex-col sm:flex-row gap-2 border-l-8 pl-2 border-l-stone-700 ${labelProps.className}`}>
      {labelProps.children}
      <input
        {...rest}
        className={`w-full bg-transparent text-stone-50 placeholder:font-light focus:outline-none font-mono ${rest.className}`}
      />
    </label>
  );
}

export default Input;
