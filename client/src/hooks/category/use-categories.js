import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/api';
import { categoryView } from '@/store';
// Query Keys
export const categoryQueryKeys = {
    all: ['categories'],
    lists: () => [...categoryQueryKeys.all, 'list'],
    list: (filters) => [...categoryQueryKeys.lists(), { filters }],
    details: () => [...categoryQueryKeys.all, 'detail'],
    detail: (id) => [...categoryQueryKeys.details(), id],
    byStatus: (isArchived) => [...categoryQueryKeys.all, 'byStatus', isArchived],
    search: (query) => [...categoryQueryKeys.all, 'search', query],
    count: () => [...categoryQueryKeys.all, 'count'],
    countByStatus: (isArchived) => [...categoryQueryKeys.all, 'count', 'byStatus', isArchived],
    summary: () => [...categoryQueryKeys.all, 'summary'],
    stats: () => [...categoryQueryKeys.all, 'stats'],
};
export function useCategories() {
    const { data: categories = [], error, isLoading: loading, isError, } = useQuery({
        queryKey: categoryQueryKeys.all,
        queryFn: categoryView.getCategories,
    });
    return {
        categories,
        error: isError ? (error === null || error === void 0 ? void 0 : error.message) || 'Failed to fetch categories' : null,
        loading,
    };
}
// export function useCategorySummary() {
//   const {
//     data: summary,
//     error,
//     isLoading: loading,
//     isError
//   } = useQuery({
//     queryKey: categoryQueryKeys.summary(),
//     queryFn: categoryView.getCategorySummary,
//   })
//   return {
//     summary,
//     error: isError ? (error?.message || 'Failed to fetch category summary') : null,
//     loading
//   }
// }
// export function useCategoryStats() {
//   const {
//     data: stats,
//     error,
//     isLoading: loading,
//     isError
//   } = useQuery({
//     queryKey: categoryQueryKeys.stats(),
//     queryFn: categoryView.getCategoryStats,
//   })
//   return {
//     stats,
//     error: isError ? (error?.message || 'Failed to fetch category stats') : null,
//     loading
//   }
// }
// export function useCategory(id: string) {
//   const {
//     data: category,
//     error,
//     isLoading: loading,
//     isError
//   } = useQuery({
//     queryKey: categoryQueryKeys.detail(id),
//     queryFn: () => categoryView.getCategoryById(id),
//     enabled: !!id,
//   })
//   return {
//     category,
//     error: isError ? (error?.message || 'Failed to fetch category') : null,
//     loading
//   }
// }
// export function useCategoriesByStatus(isArchived: boolean) {
//   const {
//     data: categories = [],
//     error,
//     isLoading: loading,
//     isError
//   } = useQuery({
//     queryKey: categoryQueryKeys.byStatus(isArchived),
//     queryFn: () => categoryView.getCategoriesByStatus(isArchived),
//   })
//   return {
//     categories,
//     error: isError ? (error?.message || 'Failed to fetch categories by status') : null,
//     loading
//   }
// }
// export function useSearchCategories(query: string) {
//   const {
//     data: categories = [],
//     error,
//     isLoading: loading,
//     isError
//   } = useQuery({
//     queryKey: categoryQueryKeys.search(query),
//     queryFn: () => categoryView.searchCategories(query),
//     enabled: query.length > 0,
//   })
//   return {
//     categories,
//     error: isError ? (error?.message || 'Failed to search categories') : null,
//     loading
//   }
// }
// export function useCategoriesCount() {
//   const {
//     data: count = 0,
//     error,
//     isLoading: loading,
//     isError
//   } = useQuery({
//     queryKey: categoryQueryKeys.count(),
//     queryFn: categoryView.getCategoriesCount,
//   })
//   return {
//     count,
//     error: isError ? (error?.message || 'Failed to fetch categories count') : null,
//     loading
//   }
// }
// export function useCategoriesCountByStatus(isArchived: boolean) {
//   const {
//     data: count = 0,
//     error,
//     isLoading: loading,
//     isError
//   } = useQuery({
//     queryKey: categoryQueryKeys.countByStatus(isArchived),
//     queryFn: () => categoryView.getCategoriesCountByStatus(isArchived),
//   })
//   return {
//     count,
//     error: isError ? (error?.message || 'Failed to fetch categories count by status') : null,
//     loading
//   }
// }
// export function useCreateCategory() {
//   return useMutation({
//     mutationFn: categoryView.createCategory,
//     onSuccess: () => {
//       // Invalidate and refetch categories after successful creation
//       queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
//     },
//     onError: (error) => {
//       console.error('Failed to create category:', error)
//     }
//   })
// }
// export function useCreateCategories() {
//   return useMutation({
//     mutationFn: categoryView.createCategories,
//     onSuccess: () => {
//       // Invalidate and refetch categories after successful bulk creation
//       queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
//     },
//     onError: (error) => {
//       console.error('Failed to create categories:', error)
//     }
//   })
// }
// export function useUpdateCategory() {
//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: CreateCategoryDto }) =>
//       categoryView.updateCategory(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
//     },
//     onError: (error) => {
//       console.error('Failed to update category:', error)
//     }
//   })
// }
export function useDeleteCategory() {
    return useMutation({
        mutationFn: categoryView.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
        },
        onError: error => {
            console.error('Failed to delete category:', error);
        },
    });
}
