import { useCategories } from './hooks/use-categories';

export function Categories() {
  const { categories, error, loading } = useCategories();
  console.log('LOGGING: ', categories);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}
