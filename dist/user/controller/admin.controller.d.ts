import { Model } from "mongoose";
import { AuthService } from "src/auth/services/auth.service";
import { user } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
export declare class AdminController {
    private readonly userModel;
    private readonly userService;
    private readonly authService;
    constructor(userModel: Model<user>, userService: UserService, authService: AuthService);
    createUser(data: {
        name: string;
        password: string;
        email: string;
        phone: number;
    }): Promise<Object>;
    updateUser(data: {
        id: string;
        name: string;
        password: string;
        email: string;
        phone: number;
        status: boolean;
    }): Promise<Object>;
    getUserById(userId: string): Promise<Object>;
    getAllUsers(): Promise<Object>;
}
