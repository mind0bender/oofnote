"use client";

import { useActionState, useEffect } from "react";
import { Id, toast } from "react-toastify";
import { ResType } from "../response.helper";

export default function useCustomActionState<Payload>(
  action: (
    state: Awaited<ResType>,
    payload: Payload
  ) => ResType | Promise<ResType>,
  initialState: Awaited<ResType>
): [
  state: Awaited<ResType>,
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
