import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    googleAccessToken: {
      type: String,
      required: false,
    },
    googleRefreshToken: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: true,
    },

    // stripeCustomerId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    // },
  },
  {
    timestamps: true,
  },
);

export const User = models.User || model("User", userSchema);
