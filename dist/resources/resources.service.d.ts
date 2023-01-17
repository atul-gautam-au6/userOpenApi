import { SentMessageInfo, SendMailOptions } from "nodemailer";
export declare class ResourcesService {
    sendMail(mailOptions: SendMailOptions): Promise<SentMessageInfo>;
    sendMailjet(): Promise<any>;
    paginationUsable(page: number, size: number, search: string): Promise<Object>;
    otpService(otp: number): Promise<Object>;
    generateNotification(): Promise<Object>;
}
