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
  errorResponse,
  ResponseType,
  successResponse,
} from "../helper/response";
import connectToDB from "../database";
import User, { UserInterface } from "../database/models/user/user";
import {
  passwordSchema,
  usernameSchema,
} from "../database/models/user/user.validation";

const loginDataSchema: ZodObject<
  {
    username: ZodString;
    password: ZodString;
  },
  "strip",
  ZodTypeAny,
  {
    username: string;
    password: string;
  },
  {
    username: string;
    password: string;
  }
> = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const loginAction: (
  state: ResponseType<never>,
  data: FormData
) => Promise<ResponseType> = async function (
  state: ResponseType<never>,
  data: FormData
): Promise<ResponseType> {
  await connectToDB();
  const username: FormDataEntryValue | null = data.get("username");
  const password: FormDataEntryValue | null = data.get("password");

  console.log({ username, password });

  if (!username || !password) {
    return errorResponse("Bad Request", ["All fields are required"]);
  }

  const loginDataValidationResult: SafeParseReturnType<
    {
      username: string;
      password: string;
    },
    {
      username: string;
      password: string;
    }
  > = loginDataSchema.safeParse({
    username: username.toString(),
    password: password.toString(),
  });

  if (!loginDataValidationResult.success) {
    return errorResponse(
      "Bad Request",
      loginDataValidationResult.error.errors.map(
        (error: ZodIssue): string => error.message
      )
    );
  } else {
    const user: UserInterface | null = await User.findOne({
      username: loginDataValidationResult.data.username,
    });
    if (!user) {
      return errorResponse(
        "Unauthorized",
        ["Incorrect username or password"],
        401
      );
    }
    if (!user.verifyPassword(loginDataValidationResult.data.password)) {
      return errorResponse(
        "Unauthorized",
        ["Invalid username or password"],
        401
      );
    } else {
      user.updateOne({ lastAwakening: new Date() });
      await user.save();
      return successResponse("Login successful");
    }
  }
};