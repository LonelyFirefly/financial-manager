/**
 * Category API Endpoints
 * Centralized endpoint definitions for the categories service
 */
export const RESOURCES = {
    // Base endpoint
    BASE: '/category',
    // CRUD operations
    LIST: '/category',
    CREATE: '/category',
    // Dynamic endpoints (functions that take parameters)
    GET_BY_ID: (id) => `/category/${id}`,
    UPDATE: (id) => `/category/${id}`,
    DELETE: (id) => `/category/${id}`,
    // Query endpoints
    BY_STATUS: (isArchived) => `/category?isArchived=${isArchived}`,
    SEARCH: (query) => `/category/search?q=${encodeURIComponent(query)}`,
    // Count endpoints
    COUNT: '/category/count',
    COUNT_BY_STATUS: (isArchived) => `/category/count?isArchived=${isArchived}`,
};
