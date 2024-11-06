import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "./LoginForm";
import Button from "@/app/components/Button";
import { getUser, SessionState } from "@/app/helper/session.helper";

export default async function LoginPage(): Promise<JSX.Element> {
  const [user, isOnline]: SessionState = await getUser({
    projection: {
      username: 1,
    },
  });
  return (
    <>
      <div data-alive={isOnline} className={`hidden alive:flex flex-col gap-2`}>
        <div>
          No need to knock again
          <br />
          You&apos;ve already opened the portal as {user?.username}.
        </div>
        <div>
          <Link href={`/auth/logout`}>
            <Button>Logout</Button>
          </Link>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm data-alive={isOnline} className={`block alive:hidden`} />
      </Suspense>
    </>
  );
}
