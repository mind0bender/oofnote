import { ok } from "assert";
import { config } from "dotenv";

config();

export const DB_USER: string = process.env.DB_USER || ``;
export const DB_PSWD: string = process.env.DB_PSWD || ``;
export const MONGODB_URI: string = process.env.MONGODB_URI || ``;
export const SESSION_SECRET: string = process.env.SESSION_SECRET || ``;

ok(DB_USER, `DB_USER is not set`);
ok(DB_PSWD, `DB_PSWD is not set`);
ok(MONGODB_URI, `MONGODB_URI is not set`);
ok(SESSION_SECRET, `SESSION_SECRET is not set`);

export const ENCODED_SESSION_SECRET = new TextEncoder().encode(SESSION_SECRET);
