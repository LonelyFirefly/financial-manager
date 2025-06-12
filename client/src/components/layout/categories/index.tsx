import { useMemo } from 'react';

import { useCategories, useDeleteCategory } from '@/hooks';
import { CategoryClientModel } from '@/models/client/category.model';

import { CategoryTable } from './CategoryTable';
import './categories.css';

type Category = CategoryClientModel.Category;

export function Categories() {
  const { categories, error, loading } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  const {
    essentialCategories,
    nonEssentialCategories,
    essentialTotal,
    nonEssentialTotal,
  } = useMemo(() => {
    if (!categories) {
      return {
        essentialCategories: [],
        nonEssentialCategories: [],
        essentialTotal: 0,
        nonEssentialTotal: 0,
      };
    }

    const [essential, nonEssential] = getCategories(categories);

    const essentialTotal = getTotalValue(essential);
    const nonEssentialTotal = getTotalValue(nonEssential);

    return {
      essentialCategories: essential,
      nonEssentialCategories: nonEssential,
      essentialTotal,
      nonEssentialTotal,
    };
  }, [categories]);

  const handleEdit = (category: Category) => {
    console.log('Edit category:', category);
    // TODO: Implement edit functionality
  };

  const handleDelete = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(categoryId);
    }
  };

  if (loading) {
    return (
      <div className='categories-loading'>
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='categories-error'>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='categories-container'>
      <h1 className='categories-title'>Financial Categories</h1>

      <div className='categories-summary'>
        <div className='summary-card'>
          <h3>Essential Total</h3>
          <p className='total-amount essential'>${essentialTotal}</p>
        </div>
        <div className='summary-card'>
          <h3>Non-Essential Total</h3>
          <p className='total-amount non-essential'>${nonEssentialTotal}</p>
        </div>
        <div className='summary-card'>
          <h3>Grand Total</h3>
          <p className='total-amount grand'>
            ${essentialTotal + nonEssentialTotal}
          </p>
        </div>
      </div>

      <div className='categories-tables'>
        <CategoryTable
          title='Essential Categories'
          categories={essentialCategories}
          totalValue={essentialTotal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CategoryTable
          title='Non-Essential Categories'
          categories={nonEssentialCategories}
          totalValue={nonEssentialTotal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
function filterCategoriesByType(
  categories: Category[],
  type: 'essential' | 'non-essential'
): Category[] {
  return categories.filter((category: Category) => category.type === type);
}

function getCategories(categories: Category[]): [Category[], Category[]] {
  const essential = filterCategoriesByType(categories, 'essential');
  const nonEssential = filterCategoriesByType(categories, 'non-essential');

  return [essential, nonEssential];
}

function getTotalValue(categories: Category[]): number {
  return categories.reduce((sum, category) => sum + (category.value || 0), 0);
}
