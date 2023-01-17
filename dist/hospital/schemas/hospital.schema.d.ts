import * as mongoose from "mongoose";
declare const hospitalSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    bannerImage: string;
    image: string;
    status: boolean;
    name?: string;
    email?: string;
    phone?: number;
    location?: string;
    point?: {
        enum: unknown[] | unknown[] | unknown[];
        type?: string;
        default?: unknown;
    };
    description?: string;
}>;
export default hospitalSchema;
