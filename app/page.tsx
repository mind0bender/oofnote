"use client";

import { useCallback, useState } from "react";
import HorizontalRuler from "./components/HorizontalRuler";
import Input from "./components/Input";
import Button from "./components/Button";

export default function Home(): JSX.Element {
  const [email, setEmail] = useState<string>("");

  const handleEmailChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(event.target.value);
    },
    []
  );

  return (
    <main className={`flex flex-col grow gap-10 justify-center px-6 sm:px-10`}>
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
      <form className={`flex flex-col justify-center gap-4 font-mono`}>
        <p className={`text-lg text-white`}>Embrace the inevitable.</p>
        <Input
          labelProps={{
            htmlFor: "email",
            children: <>Email: </>,
          }}
          autoFocus
          autoCapitalize={"off"}
          value={email}
          type={"email"}
          id={"email"}
          placeholder={`Enter your email`}
          onChange={handleEmailChange}
        />
        <div className={`w-full px-6`}>
          <Button className={`w-full`} type={"submit"}>
            Join us
          </Button>
        </div>
      </form>
      <div
        className={`w-full flex justify-center items-center text-sm text-stone-500`}>
        We&apos;ll notify you when it&apos;s your time.
      </div>
    </main>
  );
}
