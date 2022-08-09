import { Model } from 'mongoose';
import { user } from '../interfaces/user.interface';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<user>);
    insertUser(name: string, email: string, password: string, isSubAdmin: boolean, phone: number, otp: number): Promise<user & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateUser(id: string, name: string, email: string, isSubAdmin: boolean, phone: number, status: boolean): Promise<user & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getUserById(id: string): Promise<user & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getUserByEmail(email: string): Promise<user & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    successVerification(id: string): Promise<void>;
    getAllUsers(): Promise<(user & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    signinUser(email: string, password: string): Promise<user & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    searchUser(query: string, currentUser: string): Promise<any[]>;
}
