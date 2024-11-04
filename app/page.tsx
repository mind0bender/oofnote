"use client";
import HorizontalRuler from "./components/HorizontalRuler";
import Input from "./components/Input";
import Button from "./components/Button";
import { ResponseType, successResponse } from "./helper/response";
import { useActionState, useEffect } from "react";
import { joinAction } from "./join.action";
import { Id, toast } from "react-toastify";
import Form from "./components/Form";

export default function Home(): JSX.Element {
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
    <main
      className={`flex flex-col grow gap-10 justify-center py-10 px-6 sm:px-10`}>
      <div className={`flex flex-col justify-center gap-4`}>
        <h1 className={`text-4xl font-bold text-white`}>Step into OofNote</h1>
        <p className={`text-lg text-white font-mono`}>
          The Time-Capsule That&apos;s Just a Little Less Dramatic.
          <br />
          Because Keeping Secrets Shouldn&apos;t Be This Hard.
          {/* Send a Message into the Future, Unsealed After You Die. */}
          {/* Why are you reading this? */}
        </p>
      </div>
      <HorizontalRuler />
      <div className={`flex flex-col w-full justify-center`}>
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
      </div>
    </main>
  );
}
