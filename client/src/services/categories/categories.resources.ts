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
  GET_BY_ID: (id: string) => `/category/${id}`,
  UPDATE: (id: string) => `/category/${id}`,
  DELETE: (id: string) => `/category/${id}`,
  
  // Query endpoints
  BY_STATUS: (isArchived: boolean) => `/category?isArchived=${isArchived}`,
  SEARCH: (query: string) => `/category/search?q=${encodeURIComponent(query)}`,
} as const 