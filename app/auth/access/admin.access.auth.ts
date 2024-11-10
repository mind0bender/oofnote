import connectToDB from "@/app/database";
import { UserInterface, UserRoles } from "@/app/database/models/user/user";
import { getUser } from "@/app/helper/session.helper";
import { redirect } from "next/navigation";

export async function confirmAdminAccess(): Promise<void> {
  await connectToDB();
  const user: UserInterface | null = await getUser({
    projection: {
      role: 1,
    },
  });
  if (!user || user.role !== UserRoles.ADMIN) {
    redirect("/auth/login");
  }
}
