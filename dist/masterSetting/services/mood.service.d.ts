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
import { mood } from "../interface/mood.interface";
export declare class MoodService {
    private readonly moodModel;
    constructor(moodModel: Model<mood>);
    insertMood(title: string, icon: string, status: boolean): Promise<import("mongoose").Document<unknown, any, mood> & mood & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateMood(id: string, title: string, status: boolean): Promise<import("mongoose").Document<unknown, any, mood> & mood & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteMood(id: string): Promise<import("mongodb").DeleteResult>;
    getAllMoods(page: number, size: number, searchKey: string): Promise<any[]>;
    getMoodByid(id: string): Promise<import("mongoose").Document<unknown, any, mood> & mood & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
