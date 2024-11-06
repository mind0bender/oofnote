"use client";

import Link from "next/link";
import Input from "@/app/components/Input";
import { Id, toast } from "react-toastify";
import Button from "@/app/components/Button";
import { useActionState, useEffect } from "react";
import { registerAction } from "./register.action";
import Form, { FormProps } from "@/app/components/Form";
import { successResponse } from "@/app/helper/response.helper";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export default function RegisterForm({ ...rest }: FormProps): JSX.Element {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const email: string = decodeURIComponent(searchParams.get("email") || "");

  const [registerState, registerFormAction, isRegisterFormActionPending] =
    useActionState(registerAction, successResponse(""));

  useEffect((): (() => void) => {
    if (registerState.success) {
      if (registerState.message) toast.success(registerState.message);
    } else {
      registerState.errors.forEach((error: string): Id => toast.error(error));
    }

    return (): void => {};
  }, [registerState]);

  return (
    <Form {...rest} action={registerFormAction} formTitle={`Register`}>
      <Input
        labelProps={{
          children: "Username",
          className: "text-stone-50",
        }}
        disabled={isRegisterFormActionPending}
        autoFocus
        autoCapitalize={"off"}
        autoCorrect={"off"}
        name={"username"}
        defaultValue={email.split("@")[0]}
        placeholder="Enter your username"
      />
      <Input
        labelProps={{
          children: "Email",
          className: "text-stone-50",
        }}
        disabled={isRegisterFormActionPending}
        placeholder={"Enter your email"}
        name={"email"}
        type={"email"}
        defaultValue={email}
      />
      <Input
        labelProps={{
          children: "Password",
          className: "text-stone-50",
        }}
        disabled={isRegisterFormActionPending}
        name={"password"}
        placeholder="Enter your password"
        type={"password"}
      />
      <div className={`w-full px-6`}>
        <Button
          disabled={isRegisterFormActionPending}
          className={`w-full`}
          type={"submit"}>
          Register
        </Button>
      </div>
      <div className={`flex justify-end text-sm`}>
        Already have an account?&nbsp;
        <Link
          className={`text-blue-400 hover:underline`}
          href={`/auth/login`}
          rel={`noopener noreferrer`}>
          Login
        </Link>
      </div>
    </Form>
  );
}
