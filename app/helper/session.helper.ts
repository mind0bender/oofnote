import connectToDB from "@/app/database";
import { ProjectionType } from "mongoose";
import { SessionPayload } from "../lib/auth/index.auth.lib";
import { getSessionData } from "../lib/auth/session.auth.lib";
import User, { UserInterface } from "@/app/database/models/user/user";

interface GetUserOpts {
  projection?: ProjectionType<UserInterface>;
}

export type SessionState = [user: UserInterface | null, isOnline: boolean];

export async function getUser({
  projection = {
    _id: true,
  },
}: GetUserOpts): Promise<SessionState> {
  await connectToDB();
  const sessionData: SessionPayload | undefined = await getSessionData();
  const _id: string | undefined = sessionData?._id;
  const user: UserInterface | null = await User.findById(_id, projection);
  return [user, !!user];
}
