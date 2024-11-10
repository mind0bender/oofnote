import connectToDB from "@/app/database";
import { ProjectionType } from "mongoose";
import { SessionPayload } from "../lib/auth/index.auth.lib";
import { getSessionData } from "../lib/auth/session.auth.lib";
import User, { UserInterface } from "@/app/database/models/user/user";

interface GetUserOpts {
  projection?: Record<keyof ProjectionType<UserInterface>, 0 | 1>;
}

const defaultProjection: Record<string, 0 | 1> = {
  _id: 1,
};

export async function getUser({
  projection,
}: GetUserOpts): Promise<UserInterface | null> {
  const finalProjection: ProjectionType<UserInterface> = {
    ...defaultProjection,
    ...projection,
  };

  await connectToDB();
  const sessionData: SessionPayload | undefined = await getSessionData();
  const _id: string | undefined = sessionData?._id;
  const user: UserInterface | null = await User.findById(_id, finalProjection);
  return user;
}
