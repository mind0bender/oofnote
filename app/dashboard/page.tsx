import { redirect } from "next/navigation";
import connectToDB from "../database";
import { getUser } from "../helper/session.helper";
import { UserInterface, UserRoles } from "../database/models/user/user";

export default async function DashboardPage(): Promise<JSX.Element> {
  await connectToDB();
  const user: UserInterface | null = await getUser({
    projection: { password: 0 },
  });
  if (!user) {
    redirect("/auth/login");
  }
  console.log(user);
  if (user?.role === UserRoles.ADMIN) {
    redirect("/admin/dashboard");
  }
  return <>dashboard</>;
}
