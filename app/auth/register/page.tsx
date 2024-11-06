import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage(): Promise<JSX.Element> {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </>
  );
}
