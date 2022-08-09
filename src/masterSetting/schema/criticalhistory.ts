import * as mongoose from "mongoose";

const criticalhistorySchema = new mongoose.Schema(
  {
    CriticalHistory: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "criticalhistory",
  }
);
export default criticalhistorySchema;
