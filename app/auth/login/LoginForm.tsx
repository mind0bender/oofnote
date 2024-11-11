"use client";
import Link from "next/link";
import Input from "@/app/components/Input";
import { Id, toast } from "react-toastify";
import Button from "@/app/components/Button";
import { loginAction } from "./login.action";
import { useEffect } from "react";
import Form, { FormProps } from "@/app/components/Form";
import { successResponse } from "@/app/helper/response.helper";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import useCustomActionState from "@/app/helper/hooks/customFormActionHook";
import { LoginRounded } from "@mui/icons-material";

export default function LoginForm({ ...rest }: FormProps): JSX.Element {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const username: string = decodeURIComponent(
    searchParams.get("username") || ""
  );

  const [loginState, loginFormAction, isLoginFormActionPending] =
    useCustomActionState(loginAction, successResponse(""));
  useEffect((): (() => void) => {
    if (loginState.success) {
      if (loginState.message) toast.success(loginState.message);
    } else {
      loginState.errors.forEach((error: string): Id => toast.error(error));
    }

    return (): void => {};
  }, [loginState]);
  return (
    <Form {...rest} action={loginFormAction} formTitle={`Login`}>
      <Input
        labelProps={{
          children: "Username",
          className: "text-stone-50",
        }}
        disabled={isLoginFormActionPending}
        autoFocus
        autoCapitalize={"off"}
        autoCorrect={"off"}
        name={"username"}
        defaultValue={username}
        placeholder="Enter your username"
      />
      <Input
        labelProps={{
          children: "Password",
          className: "text-stone-50",
        }}
        disabled={isLoginFormActionPending}
        name={"password"}
        placeholder="Enter your password"
        type={"password"}
      />
      <div className={`w-full px-6`}>
        <Button
          disabled={isLoginFormActionPending}
          className={`w-full flex justify-center items-center gap-2`}
          type={"submit"}>
          Login
          <LoginRounded />
        </Button>
      </div>
      <div className={`flex justify-end text-sm`}>
        Don&apos;t have an account?&nbsp;
        <Link
          className={`text-blue-400 hover:underline`}
          href={`/auth/register`}
          rel={`noopener noreferrer`}>
          Register
        </Link>
      </div>
    </Form>
  );
}
