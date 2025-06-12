import { QueryClient } from '@tanstack/react-query';
import { once } from 'lodash';
const createQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
        },
        mutations: {
            retry: 1,
        },
    },
});
export const queryClient = once(createQueryClient)();
