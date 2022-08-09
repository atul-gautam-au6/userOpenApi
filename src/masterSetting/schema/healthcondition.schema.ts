import * as mongoose from "mongoose";

const healthConditionSchema = new mongoose.Schema(
  {
    HealthCondition: {
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
    collection: "healthcondition",
  }
);
export default healthConditionSchema;
