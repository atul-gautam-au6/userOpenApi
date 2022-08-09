import * as mongoose from 'mongoose';

const criticalmedicalconditionSchema = new mongoose.Schema({
  MedicalConditionName: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
export default criticalmedicalconditionSchema;
