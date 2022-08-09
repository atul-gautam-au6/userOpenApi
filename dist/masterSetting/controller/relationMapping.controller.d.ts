import { Model } from 'mongoose';
import { relation } from '../interface/relation.interface';
import { RelationService } from '../services/relation.service';
export declare class RelationController {
    private readonly relationModel;
    private readonly relationService;
    constructor(relationModel: Model<relation>, relationService: RelationService);
    createRelation(data: {
        relationship: string;
        type: string;
    }): Promise<Object>;
    updateRelation(data: {
        id: string;
        relationship: string;
        type: string;
        status: boolean;
    }): Promise<Object>;
    getRelationById(id: string): Promise<Object>;
    getAllRelation(pageSize: number, newPage: number): Promise<Object>;
}
