import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoriesService } from '@/services'

export interface CreateCategoryRequest {
  name: string;
  description: string;
  isArchived: boolean;
}

export function useCategories() {
  const {
    data: categories = [],
    error,
    isLoading: loading,
    isError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  })

  return {
    categories,
    error: isError ? (error?.message || 'Failed to fetch categories') : null,
    loading
  }
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoriesService.createCategory,
    onSuccess: () => {
      // Invalidate and refetch categories after successful creation
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      console.error('Failed to create category:', error)
    }
  })
}