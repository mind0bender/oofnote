"use server";

import {
  SafeParseReturnType,
  z,
  ZodIssue,
  ZodObject,
  ZodString,
  ZodTypeAny,
} from "zod";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "../../database/models/user/user.validation";
import { ObjectId } from "mongoose";
import connectToDB from "../../database";
import { redirect } from "next/navigation";
import { errorResponse, ResponseType } from "../../helper/response.helper";
import User, { UserInterface } from "../../database/models/user/user";

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
    username: username!.toString(),
    email: email!.toString(),
    password: password!.toString(),
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
  user.setPassword(registerDataValidationResult.data.password);

  await user.save(); // save and awaken

  redirect(
    `/auth/login/?username=${encodeURIComponent(
      registerDataValidationResult.data.username
    )}`
  );
};
