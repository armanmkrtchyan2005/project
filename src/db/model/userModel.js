import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { required: true, type: String, trim: true, lowercase: true },
  surname: { required: true, type: String, trim: true, lowercase: true },
  dob: { type: Date },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
});

export const User = model("User", userSchema);
