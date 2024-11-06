"use server";

import { connect } from "mongoose";
import { Connection } from "mongoose";
import { MONGODB_URI } from "../helper/const.helper";

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

export default async function connectToDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
