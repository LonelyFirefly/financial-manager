import { useState, useEffect } from 'react';
import api from '@api/axios';

type Category = string;

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get<Category[]>('/category');
        setCategories(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, error, loading };
}

export function Main() {
  const { categories, error, loading } = useCategories();

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Main</h1>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
