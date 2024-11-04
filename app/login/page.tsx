"use client";

import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import Input from "@/app/components/Input";
import { useActionState, useEffect } from "react";
import { loginAction } from "./login.action";
import { successResponse } from "@/app/helper/response";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { Id, toast } from "react-toastify";

function LoginPage(): JSX.Element {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const username: string = decodeURIComponent(
    searchParams.get("username") || ""
  );

  const [loginState, loginFormAction, isLoginFormActionPending] =
    useActionState(loginAction, successResponse(""));

  useEffect((): (() => void) => {
    if (loginState.success) {
      if (loginState.message) toast.success(loginState.message);
    } else {
      loginState.errors.forEach((error: string): Id => toast.error(error));
    }

    return (): void => {};
  }, [loginState]);

  return (
    <main
      className={`flex flex-col grow gap-10 justify-center py-10 px-6 sm:px-10`}>
      <Form action={loginFormAction} formTitle={`Login`}>
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
            className={`w-full`}
            type={"submit"}>
            Login
          </Button>
        </div>
      </Form>
    </main>
  );
}

export default LoginPage;
