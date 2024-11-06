"use client";
import { Id, toast } from "react-toastify";
import Button from "@/app/components/Button";
import { useActionState, useEffect } from "react";
import Form, { FormProps } from "@/app/components/Form";
import { successResponse } from "@/app/helper/response.helper";
import logoutAction from "./logout.action";
import Link from "next/link";

export default function LogoutForm({ ...rest }: FormProps): JSX.Element {
  const [logoutState, logoutFormAction, isLogoutFormActionPending] =
    useActionState(logoutAction, successResponse(""));

  useEffect((): (() => void) => {
    if (logoutState.success) {
      if (logoutState.message) toast.success(logoutState.message);
    } else {
      logoutState.errors.forEach((error: string): Id => toast.error(error));
    }

    return (): void => {};
  }, [logoutState]);

  return (
    <Form
      {...rest}
      action={logoutFormAction}
      formTitle={`Are you sure you want to logout?`}>
      <div className={`flex gap-2 w-full px-6`}>
        <div>
          <Link
            tabIndex={0}
            href={"/dashboard"}
            className={`w-full outline-none`}>
            <Button data-secondary>Dashboard</Button>
          </Link>
        </div>
        <Button
          disabled={isLogoutFormActionPending}
          className={`w-full`}
          type={"submit"}>
          Logout
        </Button>
      </div>
    </Form>
  );
}
