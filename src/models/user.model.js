import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Enter username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Enter email id"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Enter Password"],
      minLength: [8, "Password must be at least 8 characters long"],
      trim: true,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const UserModel = mongoose.model("User", userSchema);
