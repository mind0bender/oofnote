"use server";

import { pbkdf2Sync, randomBytes } from "crypto";
import { Document, model, models, ObjectId, Schema } from "mongoose";

export interface UserInterface extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  salt: string;
  displayPicture: string;
  setPassword(password: string): void;
  verifyPassword(password: string): boolean;
  bornAt: Date;
  lastAwaken: Date;
}

const UserSchema: Schema<UserInterface> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    displayPicture: {
      type: String,
      default: function (): string {
        return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${this.username}`;
      },
    },
  },
  {
    methods: {
      setPassword(password: string): void {
        this.salt = randomBytes(16).toString("hex");
        this.password = pbkdf2Sync(
          password,
          this.salt,
          1000,
          64,
          "sha512"
        ).toString("hex");
      },
      verifyPassword(password: string): boolean {
        return (
          this.password ===
          pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex")
        );
      },
    },
    timestamps: {
      createdAt: "bornAt", // Use `created_at` to store the created date
      updatedAt: "lastAwaken", // and `updated_at` to store the last updated date
    },
  }
);

UserSchema.index({ username: 1, email: 1 });

// IDK if this is necessary, but just to be sure
// I'm using a pre-save hook to update the lastAwaken field
UserSchema.pre("save", function (next) {
  this.lastAwaken = new Date();
  console.log(this.lastAwaken);
  next();
});

const User = models.User || model<UserInterface>("User", UserSchema);

export default User;
