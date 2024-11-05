import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { ENCODED_SESSION_SECRET } from "../../helper/const";

export interface SessionPayload extends JWTPayload {
  _id: string;
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(ENCODED_SESSION_SECRET);
}

export async function decrypt(
  token: string | undefined = ""
): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, ENCODED_SESSION_SECRET, {
    algorithms: ["HS256"],
  });
  return payload as SessionPayload;
}
