import { criticalmedicalconditionSevice } from "../services/criticalmedicalcondition.service";
export declare class CriticalMedicalConditionController {
    private readonly criticalMedicalConditonService;
    constructor(criticalMedicalConditonService: criticalmedicalconditionSevice);
    createMedicalCondition(data: {
        MedicalConditionName: string;
        status: boolean;
    }): Promise<Object>;
    getAllCriticalMedicalCondition(pageSize: number, newPage: number): Promise<Object>;
    updateCriticalMedicalCondition(data: {
        id: string;
        MedicalConditionName: string;
        status: boolean;
    }): Promise<{
        successCode: number;
        message: string;
        data: import("mongoose").Document<unknown, any, import("../interface/criticalmedicalcondition.interface").criticalmedicalcondition> & import("../interface/criticalmedicalcondition.interface").criticalmedicalcondition & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getCriticalMedicalconditionById(Id: string): Promise<Object>;
}
