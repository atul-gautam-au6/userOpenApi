import * as mongoose from 'mongoose';
declare const moodSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    status: boolean;
    title: string;
    icon: string;
}>;
export default moodSchema;
