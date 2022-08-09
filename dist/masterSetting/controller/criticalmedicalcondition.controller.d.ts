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
import { criticalmedicalconditionSevice } from '../services/criticalmedicalcondition.service';
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
