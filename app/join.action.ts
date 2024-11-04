"use server";

import connectToDB from "@/app/database";
import { errorResponse, ResponseType } from "@/app/helper/response";
import { redirect } from "next/navigation";
import { z } from "zod";
import User from "./database/models/user/user";
import { ObjectId } from "mongoose";

export const joinAction: (
  state: ResponseType<never>,
  data: FormData
) => Promise<ResponseType> = async function (
  state: ResponseType<never>,
  data: FormData
): Promise<ResponseType> {
  await connectToDB();
  const email: FormDataEntryValue | null = data.get("email");
  if (!email) {
    return errorResponse("Bad Request", ["Email is required"]);
  }
  if (typeof email !== "string") {
    return errorResponse("Bad Request", ["Invalid email"]);
  }
  if (!z.string().email().safeParse(email).success) {
    return errorResponse("Bad Request", ["Invalid email"]);
  }
  const shouldLogin: {
    _id: ObjectId;
  } | null = await User.exists({ email });
  if (shouldLogin) {
    const { _id } = shouldLogin;
    const { username } = await User.findById(_id, {
      username: true,
    });
    return redirect(`/login/?username=${encodeURI(username)}`);
  }
  return redirect(`/register/?email=${encodeURI(email)}`);
};
