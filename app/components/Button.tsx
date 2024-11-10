import { ButtonHTMLAttributes } from "react";

function Button({
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button
      {...rest}
      className={`bg-stone-50 rounded-sm border-2 border-white text-stone-950 hover:bg-stone-300 focus:bg-stone-300 outline-none px-2 py-1.5 font-semibold duration-200 focus:ring-[1px] focus:border-black ring-white secondary:border-stone-900 secondary:bg-stone-900 secondary:hover:bg-stone-800 secondary:focus:bg-stone-800 secondary:text-stone-50 
        tertiary:border-0 tertiary:bg-transparent tertiary:hover:bg-stone-800 tertiary:text-stone-50 tertiary:focus:ring-0
       ${rest.className}`}>
      {rest.children}
    </button>
  );
}

export default Button;
