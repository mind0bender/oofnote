import { ButtonHTMLAttributes } from "react";

function Button({
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button
      {...rest}
      className={`bg-stone-50 rounded-sm border border-white text-stone-950 hover:bg-stone-300 focus:bg-stone-300 outline-none px-2 py-1.5 font-semibold duration-200 focus:ring focus:border-black ring-white ${rest.className}`}>
      {rest.children}
    </button>
  );
}

export default Button;
