import { Strategy } from "passport-jwt";
declare const UserStrategy_base: new (...args: any[]) => Strategy;
export declare class UserStrategy extends UserStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        username: any;
    }>;
}
export {};
