import { Model } from 'mongoose';
import { CategoryService } from '../services/category.service';
import { category } from '../interface/category.interface';
export declare class CategoryController {
    private readonly categoryModel;
    private readonly categoryService;
    constructor(categoryModel: Model<category>, categoryService: CategoryService);
    createCategory(data: {
        name: string;
        status: boolean;
        isPodcast: boolean;
    }): Promise<Object>;
    updateCategory(data: {
        id: string;
        name: string;
        status: boolean;
    }): Promise<Object>;
    getCategoryById(categoryId: string): Promise<Object>;
    createCategoryPodcast(data: {
        name: string;
        status: boolean;
        isPodcast: boolean;
    }): Promise<Object>;
    updateCategoryPodcast(data: {
        id: string;
        name: string;
        status: boolean;
    }): Promise<Object>;
    getCategoryPodcastById(categoryId: string): Promise<Object>;
    createCategoryQuestion(req: any, data: {
        name: string;
        status: boolean;
    }): Promise<Object>;
    updateCategoryQuestion(data: {
        id: string;
        name: string;
        status: boolean;
    }): Promise<Object>;
    getCategoryQuById(categoryId: string): Promise<Object>;
    getAllcategories(pageSize: number, newPage: number, searchKey: string, type: string): Promise<Object>;
}
