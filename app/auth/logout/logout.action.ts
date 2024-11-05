"use server";

import {
  errorResponse,
  ResponseType,
  successResponse,
} from "../../helper/response";
import User, { UserInterface } from "../../database/models/user/user";
import { getSessionData } from "@/app/lib/auth/session.auth.lib";
import { SessionPayload } from "@/app/lib/auth/index.auth.lib";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import connectToDB from "@/app/database";

export const logoutAction: () => Promise<ResponseType> =
  async function (): Promise<ResponseType> {
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
      const username: string = user.username;
      await user.save(); // awaken
      return successResponse(`Logged out of ${username}`);
    } else {
      return successResponse(`Already logged out`);
    }
  };
