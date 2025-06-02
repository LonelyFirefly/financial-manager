import { CategoryClientModel } from '@/models/client/category.model';
import { categoriesService } from '../service/category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryBackendDto,
} from '../service';
import { once } from 'lodash';

type Category = CategoryClientModel.Category;

/**
 * Category View Layer - Acts as Controller
 * Uses category service and forwards data to the view with transformations
 */

export interface CategorySummary {
  essentialCategories: Category[];
  nonEssentialCategories: Category[];
  essentialTotal: number;
  nonEssentialTotal: number;
  grandTotal: number;
  totalCount: number;
}

export interface CategoryFilters {
  type?: 'essential' | 'non-essential';
  isArchived?: boolean;
  searchQuery?: string;
}

export interface CategoryStats extends CategorySummary {
  averageValue: number;
  essentialPercentage: number;
  nonEssentialPercentage: number;
}

export class CategoryView {
  /**
   * Transform backend category to frontend category
   */
  private transformCategory = (
    backendCategory: CategoryBackendDto
  ): Category => {
    return {
      ...backendCategory,
      value: parseFloat(backendCategory.value) || 0, // Convert string to number
    };
  };

  /**
   * Transform array of backend categories to frontend categories
   */
  private transformCategories = (
    backendCategories: CategoryBackendDto[]
  ): Category[] => {
    return backendCategories.map(category => this.transformCategory(category));
  };

  /**
   * Get all categories from service with transformation
   */
  public getCategories = async (): Promise<Category[]> => {
    const backendCategories = await categoriesService.getCategories();
    return this.transformCategories(backendCategories);
  };

  // /**
  //  * Get category by ID from service with transformation
  //  */
  // static async getCategoryById(id: string): Promise<Category> {
  //   const backendCategory = await categoriesService.getCategoryById(id);
  //   return this.transformCategory(backendCategory);
  // }

  // /**
  //  * Create a new category using service with transformation
  //  */
  // static async createCategory(data: CreateCategoryDto): Promise<Category> {
  //   const backendCategory = await categoriesService.createCategory(data);
  //   return this.transformCategory(backendCategory);
  // }

  // /**
  //  * Create multiple categories using service with transformation
  //  */
  // static async createCategories(data: CreateCategoryDto[]): Promise<Category[]> {
  //   const backendCategories = await categoriesService.createCategories(data);
  //   return this.transformCategories(backendCategories);
  // }

  // /**
  //  * Update category using service with transformation
  //  */
  // static async updateCategory(id: string, data: UpdateCategoryDto): Promise<Category> {
  //   const backendCategory = await categoriesService.updateCategory(id, data);
  //   return this.transformCategory(backendCategory);
  // }

  /**
   * Delete category using service
   */
  public deleteCategory = async (id: string): Promise<void> => {
    return categoriesService.deleteCategory(id);
  };

  /**
   * Get categories by status from service with transformation
  //  */
  // static async getCategoriesByStatus(isArchived: boolean): Promise<Category[]> {
  //   const backendCategories = await categoriesService.getCategoriesByStatus(isArchived);
  //   return this.transformCategories(backendCategories);
  // }

  // /**
  //  * Search categories using service with transformation
  //  */
  // static async searchCategories(query: string): Promise<Category[]> {
  //   const backendCategories = await categoriesService.searchCategories(query);
  //   return this.transformCategories(backendCategories);
  // }

  // /**
  //  * Get categories count from service
  //  */
  // static async getCategoriesCount(): Promise<number> {
  //   return categoriesService.getCategoriesCount();
  // }

  // /**
  //  * Get categories count by status from service
  //  */
  // static async getCategoriesCountByStatus(isArchived: boolean): Promise<number> {
  //   return categoriesService.getCategoriesCountByStatus(isArchived);
  // }

  // /**
  //  * Get categories with summary calculations
  //  */
  // static async getCategorySummary(): Promise<CategorySummary> {
  //   const categories = await this.getCategories();
  //   return this.calculateSummary(categories);
  // }

  // /**
  //  * Get categories with detailed statistics
  //  */
  // static async getCategoryStats(): Promise<CategoryStats> {
  //   const categories = await this.getCategories();
  //   const summary = this.calculateSummary(categories);
  //   const averageValue = summary.totalCount > 0 ? summary.grandTotal / summary.totalCount : 0;

  //   return {
  //     ...summary,
  //     averageValue,
  //     essentialPercentage: summary.grandTotal > 0 ? (summary.essentialTotal / summary.grandTotal) * 100 : 0,
  //     nonEssentialPercentage: summary.grandTotal > 0 ? (summary.nonEssentialTotal / summary.grandTotal) * 100 : 0
  //   };
  // }

  // /**
  //  * Get filtered categories
  //  */
  // static async getFilteredCategories(filters: CategoryFilters): Promise<Category[]> {
  //   const categories = await this.getCategories();
  //   return this.applyFilters(categories, filters);
  // }

  // /**
  //  * Get categories sorted by name
  //  */
  // static async getCategoriesSortedByName(ascending: boolean = true): Promise<Category[]> {
  //   const categories = await this.getCategories();
  //   return this.sortByName(categories, ascending);
  // }

  // /**
  //  * Get categories sorted by value
  //  */
  // static async getCategoriesSortedByValue(ascending: boolean = true): Promise<Category[]> {
  //   const categories = await this.getCategories();
  //   return this.sortByValue(categories, ascending);
  // }

  // /**
  //  * Get categories that need attention
  //  */
  // static async getCategoriesNeedingAttention(): Promise<{
  //   highValue: Category[];
  //   archived: Category[];
  // }> {
  //   const categories = await this.getCategories();
  //   return {
  //     highValue: categories.filter(category => this.isHighValueCategory(category)),
  //     archived: categories.filter(category => category.isArchived)
  //   };
  // }

  // // Private utility methods for data transformation
  // private static calculateSummary(categories: Category[]): CategorySummary {
  //   const essentialCategories = this.filterByType(categories, 'essential');
  //   const nonEssentialCategories = this.filterByType(categories, 'non-essential');

  //   const essentialTotal = this.calculateTotal(essentialCategories);
  //   const nonEssentialTotal = this.calculateTotal(nonEssentialCategories);
  //   const grandTotal = essentialTotal + nonEssentialTotal;
  //   const totalCount = categories.length;

  //   return {
  //     essentialCategories,
  //     nonEssentialCategories,
  //     essentialTotal,
  //     nonEssentialTotal,
  //     grandTotal,
  //     totalCount
  //   };
  // }

  // private static filterByType(categories: Category[], type: 'essential' | 'non-essential'): Category[] {
  //   return categories.filter(category => category.type === type);
  // }

  // private static filterByArchived(categories: Category[], isArchived: boolean): Category[] {
  //   return categories.filter(category => category.isArchived === isArchived);
  // }

  // private static searchCategoriesByQuery(categories: Category[], query: string): Category[] {
  //   const lowercaseQuery = query.toLowerCase();
  //   return categories.filter(category =>
  //     category.name.toLowerCase().includes(lowercaseQuery) ||
  //     category.description.toLowerCase().includes(lowercaseQuery)
  //   );
  // }

  // private static applyFilters(categories: Category[], filters: CategoryFilters): Category[] {
  //   let filtered = [...categories];

  //   if (filters.type) {
  //     filtered = this.filterByType(filtered, filters.type);
  //   }

  //   if (filters.isArchived !== undefined) {
  //     filtered = this.filterByArchived(filtered, filters.isArchived);
  //   }

  //   if (filters.searchQuery) {
  //     filtered = this.searchCategoriesByQuery(filtered, filters.searchQuery);
  //   }

  //   return filtered;
  // }

  // private static calculateTotal(categories: Category[]): number {
  //   return categories.reduce((sum, category) => sum + (category.value || 0), 0);
  // }

  // private static sortByName(categories: Category[], ascending: boolean = true): Category[] {
  //   return [...categories].sort((a, b) => {
  //     const comparison = a.name.localeCompare(b.name);
  //     return ascending ? comparison : -comparison;
  //   });
  // }

  // private static sortByValue(categories: Category[], ascending: boolean = true): Category[] {
  //   return [...categories].sort((a, b) => {
  //     const comparison = (a.value || 0) - (b.value || 0);
  //     return ascending ? comparison : -comparison;
  //   });
  // }

  // private static isHighValueCategory(category: Category, threshold: number = 1000): boolean {
  //   return (category.value || 0) > threshold;
  // }

  // /**
  //  * Format currency value for display
  //  */
  // static formatCurrency(value: number, currency: string = 'USD'): string {
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency,
  //   }).format(value);
  // }
}

export const categoryView = once(() => new CategoryView())();
