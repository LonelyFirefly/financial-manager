import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { Category } from 'src/models/category';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  text: Category;
}
