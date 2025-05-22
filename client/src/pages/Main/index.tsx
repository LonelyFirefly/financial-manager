import { useState, useEffect } from 'react';
import api from '@api/axios';

type Category = string;

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get<Category[]>('/category');
      setCategories(response.data);
    }

    fetchCategories();
  }, []);

  return categories;
}

export function Main() {
  const categories  = useCategories();

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
