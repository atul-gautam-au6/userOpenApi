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
import { ResourcesService } from "src/resources/resources.service";
import { hospital } from "../interfaces/hospital.interface";
export declare class HospitalService {
    private readonly hospitalModel;
    private readonly resoureService;
    constructor(hospitalModel: Model<hospital>, resoureService: ResourcesService);
    insertHospital(name: string, email: string, phone: number, location: string, point: any, bannerImage: string, image: string, description: string): Promise<import("mongoose").Document<unknown, any, hospital> & hospital & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateHospital(id: string, name: string, email: string, phone: number, location: string, point: any, bannerImage: string, image: string, description: string, status: boolean): Promise<import("mongoose").Document<unknown, any, hospital> & hospital & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getHospitalById(id: string): Promise<import("mongoose").Document<unknown, any, hospital> & hospital & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getHospitalList(page: number, size: number, searchKey: string): Promise<any[]>;
}
