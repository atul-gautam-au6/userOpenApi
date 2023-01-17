import { Model } from "mongoose";
import { location } from "../interface/location.interface";
import { LocationService } from "../services/location.service";
export declare class LocationController {
    private readonly locationModel;
    private readonly locationService;
    constructor(locationModel: Model<location>, locationService: LocationService);
    createLocation(data: {
        state: string;
        city: string;
        pinCode: number;
    }): Promise<Object>;
    updateLocation(data: {
        id: string;
        state: string;
        city: string;
        pinCode: number;
        status: boolean;
    }): Promise<Object>;
    getLocationById(id: string): Promise<Object>;
    getAllLocation(pageSize: number, newPage: number): Promise<Object>;
}
