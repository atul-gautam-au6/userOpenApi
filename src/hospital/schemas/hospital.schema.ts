import * as mongoose from "mongoose";
import { validateEmail } from "src/config/email.validator";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      max: 20,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    phone: {
      type: Number,
      require: true,
      unique: true,
    },
    location: {
      type: String,
      max: 25,
    },
    point: {
      type: {
        type: "String",
        enum: ["Point", "LineString", "Polygon"],
        default: "Point",
      },
      coordinates: [Number],
    },
    bannerImage: {
      type: String,
      require: true,
      default: "",
    },
    image: {
      type: String,
      require: true,
      default: "",
    },
    description: {
      type: String,
      require: true,
      max: 2000,
      trim: true,
    },
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "hospital",
  }
);

hospitalSchema.index({ point: "2dsphere" });

export default hospitalSchema;
