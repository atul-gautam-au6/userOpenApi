/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { HealthConditionService } from '../services/healthcondition.service';
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
