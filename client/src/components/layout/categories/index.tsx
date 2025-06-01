import { useCategories, useCategoriesCount } from '@/hooks';

export function Categories() {
  const { categories, error, loading } = useCategories();
  const { count: categoriesCount } = useCategoriesCount();
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.value}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Total Value</td>
            <td>{categoriesCount}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
