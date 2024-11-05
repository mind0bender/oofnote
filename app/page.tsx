import HorizontalRuler from "./components/HorizontalRuler";
import JoinForm from "./joinForm";

export default function Home(): JSX.Element {
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
        <JoinForm />
      </div>
    </main>
  );
}
