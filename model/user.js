const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter name"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
