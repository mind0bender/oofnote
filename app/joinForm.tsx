"use client";
import Form from "./components/Form";
import Input from "./components/Input";
import Button from "./components/Button";
import { joinAction } from "./join.action";
import { successResponse } from "./helper/response.helper";
import useCustomActionState from "./helper/hooks/customFormActionHook";

export default function JoinForm(): JSX.Element {
  const [, joinFormAction, isJoinActionPending] = useCustomActionState(
    joinAction,
    successResponse("")
  );

  return (
    <Form
      action={(data: FormData) => {
        joinFormAction(data);
      }}
      formTitle={<>Embrace the inevitable.</>}>
      <Input
        labelProps={{
          htmlFor: "email",
          children: <>Email: </>,
        }}
        disabled={isJoinActionPending}
        autoFocus
        autoCapitalize={"off"}
        type={"email"}
        id={"email"}
        name={"email"}
        placeholder={`Enter your email`}
      />
      <div className={`w-full px-6`}>
        <Button
          disabled={isJoinActionPending}
          className={`w-full`}
          type={"submit"}>
          Join us
        </Button>
      </div>
      <div
        className={`w-full flex justify-center items-center text-sm text-stone-300`}>
        We&apos;ll notify you when it&apos;s your time.
      </div>
    </Form>
  );
}
