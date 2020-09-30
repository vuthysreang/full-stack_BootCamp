const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      max: 255
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 255
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
  },
  { timestamps: true }
);

module.exports = model("users", UserSchema);
