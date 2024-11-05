import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

function RegisterPage(): JSX.Element {
  return (
    <main
      className={`flex flex-col grow gap-10 justify-center py-10 px-6 sm:px-10`}>
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </main>
  );
}

export default RegisterPage;
