import { TreatmentService } from "../services/treatment.service";
export declare class TreatmentController {
    private readonly TreatmentService;
    constructor(TreatmentService: TreatmentService);
    createTreatment(data: {
        TreatmentName: string;
        status: boolean;
    }): Promise<Object>;
    getAllTreatments(pageSize: number, newPage: number): Promise<Object>;
    updateTreatment(data: {
        id: string;
        TreatmentName: string;
        status: boolean;
    }): Promise<{
        successCode: number;
        message: string;
        data: import("mongoose").Document<unknown, any, import("../interface/treatment.interface").Treatment> & import("../interface/treatment.interface").Treatment & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getTreatmentById(Id: string): Promise<Object>;
}
