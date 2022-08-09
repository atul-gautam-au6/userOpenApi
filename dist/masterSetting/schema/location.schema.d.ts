import * as mongoose from 'mongoose';
declare const locationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    status: boolean;
    state?: string;
    city?: string;
    pinCode?: number;
}>;
export default locationSchema;
