import Link from "next/link";
import LogoutForm from "./LogoutForm";
import Button from "@/app/components/Button";
import { getUser } from "@/app/helper/session.helper";
import { UserInterface } from "@/app/database/models/user/user";

export default async function LogoutPage(): Promise<JSX.Element> {
  const user: UserInterface | null = await getUser({
    projection: {},
  });
  return (
    <>
      <div data-alive={!!user} className={`flex flex-col gap-2 alive:hidden`}>
        <div>
          Shooo!
          <br />
          Back to the shadows you go!
        </div>
        <Link href={`/auth/login`}>
          <Button>Login Again</Button>
        </Link>
      </div>
      <LogoutForm data-alive={!!user} className={`hidden alive:block`} />
    </>
  );
}
