import * as mongoose from 'mongoose';
declare const medicinesSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    status: boolean;
    MedicineName: string;
    Manufacturer: string;
    Salt: string;
}>;
export default medicinesSchema;
