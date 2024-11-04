import { ok } from "assert";
import { config } from "dotenv";

config();

export const DB_USER: string = process.env.DB_USER || ``;
export const DB_PSWD: string = process.env.DB_PSWD || ``;

ok(DB_USER, `DB_USER is not set`);
ok(DB_PSWD, `DB_PSWD is not set`);
