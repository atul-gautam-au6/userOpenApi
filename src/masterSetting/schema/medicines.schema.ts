import * as mongoose from "mongoose";
const medicinesSchema = new mongoose.Schema(
  {
    MedicineName: {
      type: String,
      required: true,
      trim: true,
    },
    Manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    Salt: {
      type: String,
      required: true,
      trime: true,
    },

    status: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "medicines",
  }
);

export default medicinesSchema;
