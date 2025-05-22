import { CreateCategoryDto } from './create-category.dto';
import { Category } from 'src/models/category';
declare const UpdateCategoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCategoryDto>>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
    text: Category;
}
export {};
