import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoriesService, CreateCategoryRequest } from '@/services'

// Query Keys
export const categoryQueryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...categoryQueryKeys.lists(), { filters }] as const,
  details: () => [...categoryQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryQueryKeys.details(), id] as const,
}

export function useCategories() {
  const {
    data: categories = [],
    error,
    isLoading: loading,
    isError
  } = useQuery({
    queryKey: categoryQueryKeys.all,
    queryFn: categoriesService.getCategories,
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
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
    },
    onError: (error) => {
      console.error('Failed to create category:', error)
    }
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCategoryRequest }) =>
      categoriesService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
    },
    onError: (error) => {
      console.error('Failed to update category:', error)
    }
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoriesService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
    },
    onError: (error) => {
      console.error('Failed to delete category:', error)
    }
  })
} 