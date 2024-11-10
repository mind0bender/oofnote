"use client";

import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import useCustomActionState from "@/app/helper/hooks/customFormActionHook";
import { successResponse } from "@/app/helper/response.helper";
import {
  usernameUpgradeAction,
  usernameDeleteAction,
  usernameDowngradeAction,
} from "./username.user.monitor.admin.action";
import Input from "@/app/components/Input";

interface UsernameManageFormProps {
  username: string;
  role: string;
}

export default function UsernameManageForm({
  username,
  role,
}: UsernameManageFormProps): JSX.Element {
  const [, usernameDeleteFormAction, isUsernameDeleteActionPending] =
    useCustomActionState(usernameDeleteAction, successResponse());
  const [, usernameUpgradeFormAction, isUsernameUpgradeActionPending] =
    useCustomActionState(usernameUpgradeAction, successResponse());
  const [, usernameDowngradeFormAction, isUsernameDowngradeActionPending] =
    useCustomActionState(usernameDowngradeAction, successResponse());

  return (
    <Form>
      <Input name={`username`} type={`hidden`} value={username} />
      <div className={`flex gap-4 px-4`}>
        <Button
          data-error
          disabled={isUsernameDeleteActionPending}
          formAction={usernameDeleteFormAction}
          className={`bg-red-800 hover:bg-red-700 text-white w-fit`}>
          Delete
        </Button>
        {role !== "admin" ? (
          <Button
            className={`w-fit`}
            disabled={isUsernameUpgradeActionPending}
            formAction={usernameUpgradeFormAction}>
            Upgrade to Admin
          </Button>
        ) : (
          <Button
            className={`w-fit`}
            disabled={isUsernameDowngradeActionPending}
            formAction={usernameDowngradeFormAction}>
            Downgrade to User
          </Button>
        )}
      </div>
    </Form>
  );
}
