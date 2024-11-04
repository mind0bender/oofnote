"use server";

const DB_USER: string | undefined = process.env.DB_USER;
const DB_PSWD: string | undefined = process.env.DB_PSWD;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PSWD}@cluster0.jc8msxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

import { Connection } from "mongoose";
import { connect } from "mongoose";

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface GlobalWithMongo extends Global {
  mongo: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

declare const global: GlobalWithMongo;

let cached: {
  conn: Connection | null;
  promise: Promise<Connection> | null;
} = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function connectToDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(DB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;
