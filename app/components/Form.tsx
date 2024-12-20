import { FormHTMLAttributes, ReactNode } from "react";
import { ResType, successResponse } from "../helper/response.helper";
export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  formTitle?: ReactNode;
}

export async function defaultAction(): Promise<ResType> {
  return successResponse("Form submitted successfully");
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
      className={`w-full max-w-md flex flex-col justify-center gap-2 font-mono border-l-4 border-stone-700 focus-within:border-l-stone-500 ${className}`}>
      <div className={`text-lg text-white px-3 ${formTitle && "pb-2"}`}>
        {formTitle}
      </div>
      {children}
    </form>
  );
}

export default Form;
