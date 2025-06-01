import { Injectable } from '@nestjs/common';
import { Category as CategoryRepository } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// const DEFAULT_CATEGORIES: Category[] = [
//   EssentialCategory.Maintenance,
//   EssentialCategory.Transport,
//   EssentialCategory.Groceries,
//   EssentialCategory.House,
//   EssentialCategory.HouseUtilities,
//   EssentialCategory.PersonalCareAndMedicine,
//   EssentialCategory.Sport,
//   NonEssentialCategory.Entertainment,
//   NonEssentialCategory.EatingOut,
//   NonEssentialCategory.Clothes,
// ];

@Injectable()
export class CategoryService {
  // private categories: Category[] = [...DEFAULT_CATEGORIES];
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: Repository<CategoryRepository>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    console.log('LOGGING SERVICE: ', createCategoryDto);
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll(findCategoryDto: FindCategoryDto = { isArchived: false }) {
    return this.categoryRepository.find({
      where: findCategoryDto,
    });
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }

  async getTotalCategoryValue(filters?: {
    isArchived?: boolean;
  }): Promise<number> {
    const { isArchived = false } = filters || {};

    const categories = await this.categoryRepository.find({
      where: {
        isArchived,
      },
    });

    return categories.reduce((acc, category) => acc + category.value, 0);
  }
}
