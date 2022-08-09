import * as mongoose from 'mongoose';
declare const hospitalSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    status: boolean;
    bannerImage: string;
    image: string;
    location?: string;
    name?: string;
    description?: string;
    email?: string;
    phone?: number;
    point?: {
        enum: unknown[] | unknown[] | unknown[];
        type?: string;
        default?: unknown;
    };
}>;
export default hospitalSchema;
