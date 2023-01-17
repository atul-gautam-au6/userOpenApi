import * as mongoose from "mongoose";
declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    status: boolean;
    name?: string;
    email?: string;
    phone?: number;
    password?: string;
}>;
export default userSchema;
