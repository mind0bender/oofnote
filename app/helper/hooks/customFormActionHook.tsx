"use client";

import { useActionState, useEffect } from "react";
import { Id, toast } from "react-toastify";
import { ResponseType } from "../response.helper";

export default function useCustomActionState<Payload>(
  action: (
    state: Awaited<ResponseType>,
    payload: Payload
  ) => ResponseType | Promise<ResponseType>,
  initialState: Awaited<ResponseType>
): [
  state: Awaited<ResponseType>,
  dispatch: (payload: Payload) => void,
  isPending: boolean
] {
  const [formState, formAction, isFormActionPending] = useActionState(
    action,
    initialState
  );

  useEffect((): (() => void) => {
    if (formState.success) {
      if (formState.message) toast.success(formState.message);
    } else {
      formState.errors.forEach((error: string): Id => toast.error(error));
    }

    return (): void => {};
  }, [formState]);
  return [formState, formAction, isFormActionPending];
}
