import * as mongoose from "mongoose";
declare const cmsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    status: boolean;
    name?: string;
    description?: string;
}>;
export default cmsSchema;
