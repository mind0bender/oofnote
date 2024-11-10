"use server";
import { confirmAdminAccess } from "@/app/auth/access/admin.access.auth";
import User, { UserRoles } from "@/app/database/models/user/user";
import {
  errorResponse,
  ResType,
  successResponse,
} from "@/app/helper/response.helper";
import { ObjectId } from "mongoose";

export async function usernameDeleteAction(state: ResType, data: FormData) {
  await confirmAdminAccess();
  const username: FormDataEntryValue | null = data.get("username");
  if (!username) {
    return errorResponse("Username is required", ["Username is required"], 400);
  }
  const exists: {
    _id: ObjectId;
  } | null = await User.exists({ username });
  if (!exists) {
    return errorResponse("User not found", ["User not found"], 404);
  }
  await User.deleteOne({ username });
  return successResponse(`User ${username} deleted`);
}

export async function usernameUpgradeAction(
  state: ResType,
  data: FormData
): Promise<ResType> {
  await confirmAdminAccess();
  const username: FormDataEntryValue | null = data.get("username");
  if (!username) {
    return errorResponse(
      "Username and role are required",
      ["Username and role are required"],
      400
    );
  }
  const exists: {
    _id: ObjectId;
  } | null = await User.exists({ username });
  if (!exists) {
    return errorResponse("User not found", ["User not found"], 404);
  }
  await User.updateOne({ username }, { role: UserRoles.ADMIN });
  return successResponse(`${username} upgraded to Admin`);
}
export async function usernameDowngradeAction(
  state: ResType,
  data: FormData
): Promise<ResType> {
  await confirmAdminAccess();
  const username: FormDataEntryValue | null = data.get("username");
  if (!username) {
    return errorResponse(
      "Username and role are required",
      ["Username and role are required"],
      400
    );
  }
  const exists: {
    _id: ObjectId;
  } | null = await User.exists({ username });
  if (!exists) {
    return errorResponse("User not found", ["User not found"], 404);
  }
  await User.updateOne({ username }, { role: UserRoles.USER });
  return successResponse(`${username} downgraded to User`);
}
