import * as mongoose from 'mongoose';

const TreatmentSchema = new mongoose.Schema(
  {
    TreatmentName: {
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
    collection: 'Treatment',
  },
);
export default TreatmentSchema;
