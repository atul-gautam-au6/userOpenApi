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
import { Model } from 'mongoose';
import { Healthcondition } from '../interface/heathcondition.interface';
export declare class HealthConditionService {
    private readonly healthConditionModal;
    constructor(healthConditionModal: Model<Healthcondition>);
    insertHealthCondition(HealthCondition: string, status: boolean): Promise<import("mongoose").Document<unknown, any, Healthcondition> & Healthcondition & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllHealthCondition(page: number, pageSize: number): Promise<{
        data: (import("mongoose").Document<unknown, any, Healthcondition> & Healthcondition & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        TotalCount: number;
    } | {
        data?: undefined;
        TotalCount?: undefined;
    }>;
    updateCriticalHistory(id: string, HealthCondition: string, status: boolean): Promise<import("mongoose").Document<unknown, any, Healthcondition> & Healthcondition & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getHealthConditionByid(id: string): Promise<import("mongoose").Document<unknown, any, Healthcondition> & Healthcondition & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
