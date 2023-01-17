import { MedicinesService } from "../services/medicines.service";
export declare class MedicineController {
    private readonly MedicineService;
    constructor(MedicineService: MedicinesService);
    createMedicine(data: {
        MedicineName: string;
        Manufacturer: string;
        Salt: string;
        status: boolean;
    }): Promise<Object>;
    getAllMedicines(pageSize: number, newPage: number): Promise<Object>;
    updateMedicine(data: {
        id: string;
        MedicineName: string;
        Manufacturer: string;
        Salt: string;
        status: boolean;
    }): Promise<{
        successCode: number;
        message: string;
        data: import("mongoose").Document<unknown, any, import("../interface/medicines.interface").Medicines> & import("../interface/medicines.interface").Medicines & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getMedicineById(Id: string): Promise<Object>;
}
