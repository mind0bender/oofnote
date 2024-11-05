import { cookies } from "next/headers";
import { decrypt, encrypt, SessionPayload } from "./index.auth.lib";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function createSession(_id: string): Promise<void> {
  const expiresAt: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session: string = await encrypt({ _id, expiresAt });
  const cookieStore: ReadonlyRequestCookies = await cookies();
  cookieStore.set("session", session, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  cookieStore.delete("session");
}

export async function getSessionData(): Promise<SessionPayload | undefined> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const session: string | undefined = cookieStore.get("session")?.value;
  if (!session) return undefined;
  return decrypt(session);
}
