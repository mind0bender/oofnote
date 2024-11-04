"use server";

import { redirect } from "next/navigation";
import {
  SafeParseReturnType,
  z,
  ZodIssue,
  ZodObject,
  ZodString,
  ZodTypeAny,
} from "zod";
import { ObjectId } from "mongoose";
import { errorResponse, ResponseType } from "../helper/response";
import connectToDB from "../database";
import User, { UserInterface } from "../database/models/user/user";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "../database/models/user/user.validation";

const registerDataSchema: ZodObject<
  {
    username: ZodString;
    email: ZodString;
    password: ZodString;
  },
  "strip",
  ZodTypeAny,
  {
    username: string;
    email: string;
    password: string;
  },
  {
    username: string;
    email: string;
    password: string;
  }
> = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const registerAction: (
  state: ResponseType<never>,
  data: FormData
) => Promise<ResponseType> = async function (
  state: ResponseType<never>,
  data: FormData
): Promise<ResponseType> {
  await connectToDB();
  const username: FormDataEntryValue | null = data.get("username");
  const email: FormDataEntryValue | null = data.get("email");
  const password: FormDataEntryValue | null = data.get("password");

  console.log({ username, email, password });

  if (!username || !email || !password) {
    return errorResponse("Bad Request", ["All fields are required"]);
  }

  const registerDataValidationResult: SafeParseReturnType<
    {
      username: string;
      email: string;
      password: string;
    },
    {
      username: string;
      email: string;
      password: string;
    }
  > = registerDataSchema.safeParse({
    username: username.toString(),
    email: email.toString(),
    password: password.toString(),
  });

  if (!registerDataValidationResult.success) {
    return errorResponse(
      "Bad Request",
      registerDataValidationResult.error.errors.map(
        (error: ZodIssue): string => error.message
      )
    );
  }

  const exists: {
    _id: ObjectId;
  } | null = await User.exists({
    $or: [
      {
        email: registerDataValidationResult.data.email,
      },
      {
        username: registerDataValidationResult.data.username,
      },
    ],
  });
  if (exists) {
    return errorResponse("Bad Request", ["User already exists"], 409);
  }

  const user: UserInterface = new User({
    username: registerDataValidationResult.data.username,
    email: registerDataValidationResult.data.email,
  });
  user.setPassword(password.toString());

  console.log({ user });

  await user.save();

  return redirect(
    `/login/?username=${encodeURIComponent(
      registerDataValidationResult.data.username
    )}`
  );
};
