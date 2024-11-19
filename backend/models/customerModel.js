import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const customerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cart: {
      type: Array, // Stores the customer's cart
      default: [],
    },
  },
  { timestamps: true }
);

customerSchema.index({ email: 1 }); // Index on email field

// Hash password before saving to database
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if entered password matches stored hash
customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Customer = model("Customer", customerSchema);
export default Customer;
