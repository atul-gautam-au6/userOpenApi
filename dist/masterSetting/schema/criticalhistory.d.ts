import * as mongoose from "mongoose";
declare const criticalhistorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    status: boolean;
    CriticalHistory: string;
}>;
export default criticalhistorySchema;
