import * as mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      max: 20,
      trim: true,
    },
    isPodcast: {
      type: Boolean,
      require: true,
      default: false,
    },
    isQuetion: {
      type: Boolean,
      require: true,
      default: false,
    },
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

export default categorySchema;
