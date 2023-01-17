import { Model } from "mongoose";
import { CmsService } from "../service/cms.service";
import { cms } from "../interface/cms.interface";
export declare class CmsController {
    private readonly cmsModel;
    private cmsService;
    constructor(cmsModel: Model<cms>, cmsService: CmsService);
    createCms(data: {
        name: string;
        description: string;
    }): Promise<Object>;
    updateCms(data: {
        id: string;
        name: string;
        description: string;
        status: boolean;
    }): Promise<Object>;
    getCmsById(id: string): Promise<Object>;
    getAllCms(): Promise<Object>;
}
