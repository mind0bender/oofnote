import Link from "next/link";
import LogoutForm from "./LogoutForm";
import Button from "@/app/components/Button";
import { getUser } from "@/app/helper/session.helper";

export default async function LogoutPage(): Promise<JSX.Element> {
  const [, isOnline] = await getUser({
    projection: {},
  });
  return (
    <>
      <div data-alive={isOnline} className={`flex flex-col gap-2 alive:hidden`}>
        <div>
          Shooo!
          <br />
          Back to the shadows you go!
        </div>
        <Link href={`/auth/login`}>
          <Button>Login Again</Button>
        </Link>
      </div>
      <LogoutForm data-alive={isOnline} className={`hidden alive:block`} />
    </>
  );
}
