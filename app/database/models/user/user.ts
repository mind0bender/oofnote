import { pbkdf2Sync, randomBytes } from "crypto";
import { Document, model, models, ObjectId, Schema } from "mongoose";

export interface UserInterface extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  salt: string;
  displayPicture: string;
  createdAt: Date;
  setPassword(password: string): void;
  lastAwakening: Date;
  verifyPassword(password: string): boolean;
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
    createdAt: { type: Date, default: Date.now },
    lastAwakening: { type: Date, default: Date.now },
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
  }
);

const User = models.User || model<UserInterface>("User", UserSchema);

export default User;
