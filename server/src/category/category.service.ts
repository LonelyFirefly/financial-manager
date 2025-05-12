import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  Category,
  EssentialCategory,
  NonEssentialCategory,
} from '../models/category';

const DEFAULT_CATEGORIES: Category[] = [
  EssentialCategory.Maintenance,
  EssentialCategory.Transport,
  EssentialCategory.Groceries,
  EssentialCategory.House,
  EssentialCategory.HouseUtilities,
  EssentialCategory.PersonalCareAndMedicine,
  EssentialCategory.Sport,
  NonEssentialCategory.Entertainment,
  NonEssentialCategory.EatingOut,
  NonEssentialCategory.Clothes,
];

@Injectable()
export class CategoryService {
  private categories: Category[] = [...DEFAULT_CATEGORIES];

  create(createCategoryDto: CreateCategoryDto) {
    this.categories.push(createCategoryDto.text);
    return this.categories;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories[id];
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    this.categories[id] = updateCategoryDto.text;
    return this.categories;
  }

  remove(id: number) {
    this.categories.splice(id, 1);
    return this.categories;
  }
}
