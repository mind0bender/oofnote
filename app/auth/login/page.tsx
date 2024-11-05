import Button from "@/app/components/Button";
import LoginForm from "./LoginForm";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { getSessionData } from "@/app/lib/auth/session.auth.lib";
import { SessionPayload } from "@/app/lib/auth/index.auth.lib";
import User, { UserInterface } from "@/app/database/models/user/user";
import { Suspense } from "react";
import connectToDB from "@/app/database";

// export const revalidate = 0;

async function LoginPage(): Promise<JSX.Element> {
  await connectToDB();
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const sessionToken: string | undefined = cookieStore.get("session")?.value;
  const sessionData: SessionPayload | undefined = await getSessionData();
  const _id: string | undefined = sessionData?._id;
  const user: Pick<UserInterface, "username"> | null = await User.findById(
    _id,
    {
      username: true,
    }
  );
  const username: string | undefined = user?.username;
  return (
    <main
      className={`flex flex-col grow gap-10 justify-center py-10 px-6 sm:px-10`}>
      <div
        data-alive={!!sessionToken}
        className={`hidden alive:flex flex-col gap-2`}>
        <div>
          You&apos;ve already opened the portal as {username}.
          <br />
          No need to knock again
        </div>
        <div>
          <a href={`/auth/logout`}>
            <Button>Logout</Button>
          </a>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm
          data-alive={!!sessionToken}
          className={`block alive:hidden`}
        />
      </Suspense>
    </main>
  );
}

export default LoginPage;
