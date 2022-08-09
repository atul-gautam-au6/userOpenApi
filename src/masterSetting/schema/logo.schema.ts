import * as mongoose from 'mongoose';

const logoSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      require: true,
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
    collection: 'logo',
  },
);

export default logoSchema;
