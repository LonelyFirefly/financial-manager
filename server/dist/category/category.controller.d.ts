import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): import("../models/category").Category[];
    findAll(): import("../models/category").Category[];
    findOne(id: string): import("../models/category").Category;
    update(id: string, updateCategoryDto: UpdateCategoryDto): import("../models/category").Category[];
    remove(id: string): import("../models/category").Category[];
}
