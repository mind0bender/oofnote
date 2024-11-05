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

export const logoutAction: () => Promise<ResponseType> =
  async function (): Promise<ResponseType> {
    const sessionData: SessionPayload | undefined = await getSessionData();
    if (sessionData) {
      const { _id } = sessionData;
      const user: UserInterface | null = await User.findById(_id);
      if (!user) {
        return errorResponse("Unauthorized", ["Invalid session"], 401);
      }
      const username: string = user.username;
      const cookieStore: ReadonlyRequestCookies = await cookies();
      cookieStore.delete("session");
      return successResponse(`Logged out of ${username}`);
    } else {
      return successResponse(`Already logged out`);
    }
  };
