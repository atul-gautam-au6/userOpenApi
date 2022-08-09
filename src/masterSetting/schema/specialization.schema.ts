import * as mongoose from "mongoose";

const specializationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      max: 20,
      trim: true,
      unique: true,
    },

    status: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "specialization",
  }
);

export default specializationSchema;
