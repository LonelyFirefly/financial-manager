import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '../models/category';
export declare class CategoryService {
    private categories;
    create(createCategoryDto: CreateCategoryDto): Category[];
    findAll(): Category[];
    findOne(id: number): Category;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Category[];
    remove(id: number): Category[];
}
