"use client";
import Button from "@/app/components/Button";
import Form, { FormProps } from "@/app/components/Form";
import { useActionState, useEffect } from "react";
import { successResponse } from "@/app/helper/response";
import { Id, toast } from "react-toastify";
import { logoutAction } from "./logout.action";

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
      <div className={`w-full px-6`}>
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
