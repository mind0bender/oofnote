"use server";

import connectToDB from "@/app/database";
import { UserRoles } from "@/app/database/models/user/user";
import { errorResponse } from "@/app/helper/response.helper";
import { getUser, SessionState } from "@/app/helper/session.helper";
import { redirect } from "next/navigation";

export default async function userMonitorAdminAction() {
  await connectToDB();

  const [user, isOnline]: SessionState = await getUser({
    projection: {
      role: true,
    },
  });

  if (!isOnline) {
    redirect("/auth/login");
  } else if (user?.role !== UserRoles.ADMIN) {
    console.warn("Unauthorized access attempt");
    return errorResponse(
      "Unauthorized",
      ["Unauthorized access attempt, this incident will be reported."],
      401
    );
  }
}
