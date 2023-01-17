import { HealthConditionService } from "../services/healthcondition.service";
export declare class HealthConditionController {
    private readonly healthConditionService;
    constructor(healthConditionService: HealthConditionService);
    createHealthCondition(data: {
        HealthCondition: string;
        status: boolean;
    }): Promise<Object>;
    getAllHealthCondition(pageSize: number, newPage: number): Promise<Object>;
    updateCriticalHistory(data: {
        id: string;
        HealthCondition: string;
        status: boolean;
    }): Promise<{
        successCode: number;
        message: string;
        data: import("mongoose").Document<unknown, any, import("../interface/heathcondition.interface").Healthcondition> & import("../interface/heathcondition.interface").Healthcondition & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getHealthconditionById(Id: string): Promise<Object>;
}
