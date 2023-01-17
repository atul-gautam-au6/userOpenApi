import { Document } from "mongoose";
export interface user extends Document {
    name: string;
    email: string;
    phone: number;
    status: boolean;
    password: string;
    matchPassword(candidatePassword: string): Promise<boolean>;
}
