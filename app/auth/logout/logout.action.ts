"use server";
import {
  errorResponse,
  ResType,
  successResponse,
} from "../../helper/response.helper";
import { cookies } from "next/headers";
import connectToDB from "@/app/database";
import { SessionPayload } from "@/app/lib/auth/index.auth.lib";
import { getSessionData } from "@/app/lib/auth/session.auth.lib";
import User, { UserInterface } from "../../database/models/user/user";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { redirect } from "next/navigation";

export default async function logoutAction(): Promise<ResType> {
  const sessionData: SessionPayload | undefined = await getSessionData();
  if (sessionData) {
    const { _id } = sessionData;
    await connectToDB();
    const user: UserInterface | null = await User.findById(_id);
    const cookieStore: ReadonlyRequestCookies = await cookies();
    cookieStore.delete("session");
    if (!user) {
      return errorResponse("Unauthorized", ["Invalid session"], 401);
    }
    await user.save(); // awaken
    redirect("/auth/login");
  } else {
    return successResponse(`Already logged out`);
  }
}
