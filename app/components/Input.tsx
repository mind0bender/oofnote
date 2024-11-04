import { InputHTMLAttributes, LabelHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelProps: LabelHTMLAttributes<HTMLLabelElement>;
}

function Input({ labelProps, ...rest }: InputProps): JSX.Element {
  return (
    <label
      {...labelProps}
      className={`flex flex-col justify-center items-baseline sm:flex-row border-l-4 pl-2 border-l-stone-700 sm:space-x-2 focus-within:border-l-blue-500 disabled-within:border-l-yellow-500 disabled-within:animate-pulse ${labelProps.className}`}>
      <span>{labelProps.children}</span>
      <input
        {...rest}
        className={`w-full peer bg-transparent text-stone-50 placeholder:font-light focus:outline-none px-2 py-1 font-mono ${rest.className}`}
      />
    </label>
  );
}

export default Input;
