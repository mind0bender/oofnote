import { ok } from "assert";
import { config } from "dotenv";

config();

export const MONGODB_URI: string = process.env.MONGODB_URI || ``;
export const SESSION_SECRET: string = process.env.SESSION_SECRET || ``;

ok(MONGODB_URI, `MONGODB_URI is not set`);
ok(SESSION_SECRET, `SESSION_SECRET is not set`);

export const ENCODED_SESSION_SECRET = new TextEncoder().encode(SESSION_SECRET);
