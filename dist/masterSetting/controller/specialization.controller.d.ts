import { Model } from 'mongoose';
import { SpecializationService } from '../services/specialization.service';
import { specialization } from '../interface/specialization.interface';
export declare class SpecializationController {
    private readonly specializationModel;
    private readonly SpecializationService;
    constructor(specializationModel: Model<specialization>, SpecializationService: SpecializationService);
    createSpecialization(data: {
        name: string;
        status: boolean;
    }): Promise<Object>;
    updateSpecialization(data: {
        id: string;
        name: string;
        status: boolean;
    }): Promise<Object>;
    getCategoryById(specializationId: string): Promise<Object>;
    getAllspecialization(pageSize: number, newPage: number): Promise<Object>;
}
