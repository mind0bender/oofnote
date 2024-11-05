import { FormHTMLAttributes, ReactNode } from "react";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  formTitle?: ReactNode;
}

function Form({
  className,
  formTitle,
  children,
  ...rest
}: FormProps): JSX.Element {
  return (
    <form
      {...rest}
      className={`w-full max-w-md flex flex-col justify-center gap-4 font-mono border-l-4 border-stone-700 focus-within:border-l-stone-500 ${className}`}>
      <p className={`text-lg text-white px-3 ${formTitle && "pb-4"}`}>
        {formTitle}
      </p>
      {children}
    </form>
  );
}

export default Form;
