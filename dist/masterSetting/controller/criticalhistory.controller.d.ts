import { CriticalHistorySevice } from "../services/criticahistory.service";
export declare class CriticalHistoryController {
    private readonly criticalHsitoryService;
    constructor(criticalHsitoryService: CriticalHistorySevice);
    createCriticalHistory(data: {
        CriticalHistory: string;
        status: boolean;
    }): Promise<Object>;
    getAllCriticalHistory(pageSize: number, newPage: number): Promise<Object>;
    updateCriticalHistory(data: {
        id: string;
        CriticalHistory: string;
        status: boolean;
    }): Promise<{
        successCode: number;
        message: string;
        data: import("mongoose").Document<unknown, any, import("../interface/criticalhistory").criticalhistory> & import("../interface/criticalhistory").criticalhistory & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getCriticalHistoryById(Id: string): Promise<Object>;
}
