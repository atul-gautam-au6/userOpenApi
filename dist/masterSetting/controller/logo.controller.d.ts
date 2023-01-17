import { Model } from "mongoose";
import { logo } from "../interface/logo.interface";
import { LogoService } from "../services/logo.service";
export declare class LogoController {
    private readonly logoModel;
    private readonly logoService;
    constructor(logoModel: Model<logo>, logoService: LogoService);
    createLogo(file: any, data: {
        logo: string;
        status: boolean;
    }): Promise<Object>;
    updateLogo(file: any, data: {
        id: string;
        logo: string;
        status: boolean;
    }): Promise<Object>;
    getLogoById(logoId: string): Promise<Object>;
    getAllLogo(): Promise<Object>;
}
