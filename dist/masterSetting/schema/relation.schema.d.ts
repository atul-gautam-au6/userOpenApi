import * as mongoose from 'mongoose';
declare const relationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    status: boolean;
    type?: "Family" | "Professional" | "Locality";
    relationship?: string;
}>;
export default relationSchema;
