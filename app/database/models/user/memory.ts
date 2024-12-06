import { ObjectId, Schema } from "mongoose";

export enum MemoryTrigger {
  IMMEDIATE = "immediate", // shared immediately
  DELAYED = "delayed", // shared at a specific time in future
  FINAL = "final", // shared when the user is oofed.
  EVENTUAL = "eventual", // triggered by a specific event, bd, anniversary, etc
  RANDOM = "random", // shared randomly in the future
}

export interface MemoryInterface extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  content: string;
  author: ObjectId[];
  trigger: MemoryTrigger;
  sharedWith: ObjectId[];
  createdAt: Date;
  updatedAt: Date;

  // //   methods
  updateContent(content: string): void;
  shareWith(user: ObjectId): void;
  unshareWith(user: ObjectId): void;
  isSharedWith(user: ObjectId): boolean;
}

const MemorySchema: Schema<MemoryInterface> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    trigger: {
      type: String,
      enum: [
        MemoryTrigger.IMMEDIATE,
        MemoryTrigger.DELAYED,
        MemoryTrigger.FINAL,
        MemoryTrigger.EVENTUAL,
        MemoryTrigger.RANDOM,
      ],
      default: MemoryTrigger.FINAL,
    },
    author: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

MemorySchema.methods.updateContent = function (content: string): void {
  this.content = content;
};

MemorySchema.methods.shareWith = function (users: ObjectId[]): void {
  const newUsers: ObjectId[] = users.filter(
    (user: ObjectId): boolean => !this.isSharedWith(user)
  );
  this.sharedWith.push(...newUsers);
};

MemorySchema.methods.unshareWith = function (users: ObjectId[]): void {
  this.sharedWith = this.sharedWith.filter(
    (user: ObjectId): boolean => !users.includes(user)
  );
};

MemorySchema.methods.isSharedWith = function (user: ObjectId): boolean {
  return this.sharedWith.includes(user);
};
