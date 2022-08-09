import { MoodService } from '../services/mood.service';
export declare class MoodController {
    private readonly moodService;
    constructor(moodService: MoodService);
    addMood(file: any, data: {
        title: string;
        icon: string;
        status: boolean;
    }): Promise<Object>;
    getAllMoods(pageSize: number, newPage: number, searchKey: string): Promise<Object>;
    updateLogo(file: any, data: {
        id: string;
        icon: string;
        status: boolean;
    }): Promise<Object>;
    deleteMoodById(moodId: string): Promise<Object>;
    getMoodId(moodId: string): Promise<Object>;
}
