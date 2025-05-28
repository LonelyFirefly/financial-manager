import { categoriesService } from "@/services";
import { useState } from "react";
import { useEffect } from "react";

export function useCategories() {
    const [categories, setCategories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      async function fetchCategories() {
        try {
          const categories = await categoriesService.getCategories()
          setCategories(categories);
        } catch (error: unknown) {
          console.error(error);
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