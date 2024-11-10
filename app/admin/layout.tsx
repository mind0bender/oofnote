import { redirect } from "next/navigation";
import AdminNavbar from "../components/AdminNavbar";
import connectToDB from "../database";
import { UserInterface, UserRoles } from "../database/models/user/user";
import { getUser } from "../helper/session.helper";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  await connectToDB();
  const user: UserInterface | null = await getUser({
    projection: {
      role: 1,
    },
  });
  if (!user || user?.role !== UserRoles.ADMIN) {
    console.log("Unauthori  zed access attempt");
    redirect("/auth/login");
  }

  return (
    <div className={`flex flex-col w-full grow`}>
      <AdminNavbar />
      <main className={`flex flex-col grow items-center p-4`}>{children}</main>
    </div>
  );
}
