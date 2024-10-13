import { ButtonHTMLAttributes } from "react";

function Button({
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button
      {...rest}
      className={`bg-stone-50 rounded-sm border border-stone-50 text-stone-950 hover:bg-stone-300 px-2 py-1.5 font-semibold duration-200 ${rest.className}`}>
      {rest.children}
    </button>
  );
}

export default Button;
