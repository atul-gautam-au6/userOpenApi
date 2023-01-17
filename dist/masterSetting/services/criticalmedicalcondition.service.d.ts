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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { criticalmedicalcondition } from "../interface/criticalmedicalcondition.interface";
export declare class criticalmedicalconditionSevice {
    private readonly criticalMedicalConditionModal;
    constructor(criticalMedicalConditionModal: Model<criticalmedicalcondition>);
    insertCriticalMedicalCondition(medicalCondtionName: string, status: boolean): Promise<import("mongoose").Document<unknown, any, criticalmedicalcondition> & criticalmedicalcondition & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllCriticalMedicalCondition(page: number, pageSize: number): Promise<{
        data: (import("mongoose").Document<unknown, any, criticalmedicalcondition> & criticalmedicalcondition & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        TotalCount: number;
    } | {
        data?: undefined;
        TotalCount?: undefined;
    }>;
    updateMedicalCondition(id: string, MedicalConditionName: string, status: boolean): Promise<import("mongoose").Document<unknown, any, criticalmedicalcondition> & criticalmedicalcondition & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCriticalMedicalConditionByid(id: string): Promise<import("mongoose").Document<unknown, any, criticalmedicalcondition> & criticalmedicalcondition & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
