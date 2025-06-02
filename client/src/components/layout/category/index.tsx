import { useCategories } from '@/hooks';
import { useParams } from 'react-router-dom';
import './category.css';

export function Category() {
  const { categories } = useCategories();
  const { id } = useParams();
  const categoryId = parseInt(id ?? '0');

  const category = categories?.find(category => {
    const result = categoryId === parseInt(category.id);
    return result;
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className='category-container'>
      <h1 className='category-title'>{category.name}</h1>
      <p className='category-description'>{category.description}</p>
      <p className='category-value'>{category.value}</p>
      {category?.image && <img src={category?.image} alt={category.name} />}
    </div>
  );
}
