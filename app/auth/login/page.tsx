import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "./LoginForm";
import Button from "@/app/components/Button";
import { getUser, SessionState } from "@/app/helper/session.helper";
import Form from "@/app/components/Form";

export default async function LoginPage(): Promise<JSX.Element> {
  const [user, isOnline]: SessionState = await getUser({
    projection: {
      username: 1,
    },
  });
  return (
    <>
      <div data-alive={isOnline} className={`hidden alive:flex flex-col gap-2`}>
        <Form
          formTitle={
            <div>
              No need to knock again
              <br />
              You&apos;ve already opened the portal as {user?.username}.
            </div>
          }>
          <div className={`flex gap-2 w-full px-6`}>
            <Link
              tabIndex={0}
              href={"/dashboard"}
              className={`w-2/3 outline-none`}>
              <Button className={`w-full`}>Dashboard</Button>
            </Link>
            <Link href={`/auth/logout`} className={`flex grow`}>
              <Button data-secondary className={`w-full grow`} type={"submit"}>
                Logout
              </Button>
            </Link>
          </div>
        </Form>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm data-alive={isOnline} className={`block alive:hidden`} />
      </Suspense>
    </>
  );
}
