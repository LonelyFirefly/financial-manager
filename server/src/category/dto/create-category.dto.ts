import { Category } from 'src/models/category';

export class CreateCategoryDto {
  readonly name: Category;
  readonly description: string;
  readonly isArchived: boolean;
  readonly type: 'essential' | 'non-essential';
  readonly value: number;
}
