import { Model } from 'mongoose';
import { Response } from 'express';
import { AuthService } from 'src/auth/services/auth.service';
import { ResourcesService } from 'src/resources/resources.service';
import { user } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userModel;
    private readonly userService;
    private readonly resourcesService;
    private readonly authService;
    constructor(userModel: Model<user>, userService: UserService, resourcesService: ResourcesService, authService: AuthService);
    signinUser(req: any, res: Response, data: {
        password: string;
        email: string;
    }): Promise<Object>;
    userSignup(data: {
        name: string;
        email: string;
        password: string;
        phone: number;
    }): Promise<Object>;
    otpVerification(res: any, data: {
        email: string;
        otp: number;
    }): Promise<Object>;
    myProfile(Req: any): Promise<Object>;
}
