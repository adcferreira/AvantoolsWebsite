import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

// Checking Password
adminSchema.methods.isValidPassword = async function (password) {
  return await compare(password, this.password);
};

export default model("Admin", adminSchema);
