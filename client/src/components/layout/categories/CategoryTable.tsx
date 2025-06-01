import { Category } from '@/models/client/category.model';

interface CategoryTableProps {
  title: string;
  categories: Category[];
  totalValue: number;
  onEdit?: (category: Category) => void;
  onDelete?: (categoryId: string) => void;
}

export function CategoryTable({ 
  title, 
  categories, 
  totalValue, 
  onEdit, 
  onDelete 
}: CategoryTableProps) {
  return (
    <div className="category-table-container">
      <h2 className="category-table-title">{title}</h2>
      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="no-data">
                No {title.toLowerCase()} categories found
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category.id}>
                <td className="category-name">{category.name}</td>
                <td className="category-description">{category.description}</td>
                <td className="category-value">${category.value.toFixed(2)}</td>
                <td className="category-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => onEdit?.(category)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => onDelete?.(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan={2}><strong>Total {title}</strong></td>
            <td className="total-value"><strong>${totalValue.toFixed(2)}</strong></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
} 