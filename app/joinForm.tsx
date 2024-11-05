"use client";
import Input from "./components/Input";
import Button from "./components/Button";
import { ResponseType, successResponse } from "./helper/response";
import { useActionState, useEffect } from "react";
import { joinAction } from "./join.action";
import { Id, toast } from "react-toastify";
import Form from "./components/Form";

export default function JoinForm(): JSX.Element {
  const [state, joinFormAction, isJoinActionPending] = useActionState<
    ResponseType,
    FormData
  >(joinAction, successResponse(""));

  useEffect((): (() => void) => {
    if (state.success) {
      if (state.message) toast.success(state.message);
    } else {
      state.errors.forEach((error: string): Id => toast.error(error));
    }

    return (): void => {};
  }, [state]);

  return (
    <Form action={joinFormAction} formTitle={<>Embrace the inevitable.</>}>
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
