import { Model } from 'mongoose';
import { hospital } from '../interfaces/hospital.interface';
import { HospitalService } from '../services/hospital.service';
export declare class HospitalController {
    private readonly hospitalModel;
    private readonly hospitalService;
    constructor(hospitalModel: Model<hospital>, hospitalService: HospitalService);
    createHospital(res: any, data: {
        name: string;
        email: string;
        phone: number;
        location: string;
        point: any;
        bannerImage: string;
        image: string;
        description: string;
    }): Promise<Object>;
    updateeHospital(res: any, data: {
        id: string;
        name: string;
        email: string;
        phone: number;
        location: string;
        point: any;
        bannerImage: string;
        image: string;
        description: string;
        status: boolean;
    }): Promise<Object>;
    getHospitalById(res: any, id: string): Promise<Object>;
    allHospitals(): Promise<Object>;
}
