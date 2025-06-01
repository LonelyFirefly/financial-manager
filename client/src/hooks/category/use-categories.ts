import { useQuery, useMutation } from '@tanstack/react-query'
import { categoriesService, CreateCategoryDto } from '@/services'
import { queryClient } from '@/api'

// Query Keys
export const categoryQueryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...categoryQueryKeys.lists(), { filters }] as const,
  details: () => [...categoryQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryQueryKeys.details(), id] as const,
  byStatus: (isArchived: boolean) => [...categoryQueryKeys.all, 'byStatus', isArchived] as const,
  search: (query: string) => [...categoryQueryKeys.all, 'search', query] as const,
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

export function useCategory(id: string) {
  const { 
    data: category,
    error,
    isLoading: loading,
    isError
  } = useQuery({
    queryKey: categoryQueryKeys.detail(id),
    queryFn: () => categoriesService.getCategoryById(id),
    enabled: !!id,
  })

  return {
    category,
    error: isError ? (error?.message || 'Failed to fetch category') : null,
    loading
  }
}

export function useCategoriesByStatus(isArchived: boolean) {
  const { 
    data: categories = [],
    error,
    isLoading: loading,
    isError
  } = useQuery({
    queryKey: categoryQueryKeys.byStatus(isArchived),
    queryFn: () => categoriesService.getCategoriesByStatus(isArchived),
  })

  return {
    categories,
    error: isError ? (error?.message || 'Failed to fetch categories by status') : null,
    loading
  }
}

export function useSearchCategories(query: string) {
  const { 
    data: categories = [],
    error,
    isLoading: loading,
    isError
  } = useQuery({
    queryKey: categoryQueryKeys.search(query),
    queryFn: () => categoriesService.searchCategories(query),
    enabled: query.length > 0,
  })

  return {
    categories,
    error: isError ? (error?.message || 'Failed to search categories') : null,
    loading
  }
}

export function useCreateCategory() {
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
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCategoryDto }) =>
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