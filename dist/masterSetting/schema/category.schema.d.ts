import * as mongoose from "mongoose";
declare const categorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    status: boolean;
    isPodcast: boolean;
    isQuetion: boolean;
    name?: string;
}>;
export default categorySchema;
