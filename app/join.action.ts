"use server";
import { z } from "zod";
import { ObjectId } from "mongoose";
import connectToDB from "@/app/database";
import { redirect } from "next/navigation";
import User from "./database/models/user/user";
import { errorResponse, ResponseType } from "@/app/helper/response.helper";

export async function joinAction(
  state: ResponseType<never>,
  data: FormData
): Promise<ResponseType> {
  console.log(data);

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
    const user = await User.findById(_id);
    if (!user) {
      return errorResponse("Bad Request", ["User not found"]);
    }
    redirect(`/auth/login/?username=${encodeURI(user?.username)}`);
  }
  redirect(`/auth/register/?email=${encodeURI(email)}`);
}
