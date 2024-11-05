import Button from "@/app/components/Button";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import LogoutForm from "./LogoutForm";
import Link from "next/link";
async function LogoutPage(): Promise<JSX.Element> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const sessionToken: string | undefined = cookieStore.get("session")?.value;
  return (
    <main
      className={`flex flex-col grow gap-10 justify-center py-10 px-6 sm:px-10`}>
      <div
        data-alive={!!sessionToken}
        className={`flex flex-col gap-2 alive:hidden`}>
        <div>
          Shooo!
          <br />
          Back to the shadows you go!
        </div>
        <Link href={`/auth/login`}>
          <Button>Login Again</Button>
        </Link>
      </div>
      <LogoutForm
        data-alive={!!sessionToken}
        className={`hidden alive:block`}
      />
    </main>
  );
}

export default LogoutPage;
