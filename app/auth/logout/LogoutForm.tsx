"use client";
import Button from "@/app/components/Button";
import Form, { FormProps } from "@/app/components/Form";
import { successResponse } from "@/app/helper/response.helper";
import logoutAction from "./logout.action";
import Link from "next/link";
import useCustomActionState from "@/app/helper/hooks/customFormActionHook";

export default function LogoutForm({ ...rest }: FormProps): JSX.Element {
  const [, logoutFormAction, isLogoutFormActionPending] = useCustomActionState(
    logoutAction,
    successResponse("")
  );

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
            className={`grow outline-none`}>
            <Button data-secondary>Dashboard</Button>
          </Link>
        </div>
        <Button
          disabled={isLogoutFormActionPending}
          className={`w-2/3`}
          type={"submit"}>
          Logout
        </Button>
      </div>
    </Form>
  );
}
