/**
 * Investments API Endpoints
 * Centralized endpoint definitions for the investments service
 */

export const RESOURCES = {
  LIST: '/investments',
  CREATE: '/investments',
  GET_BY_ID: (id: string) => `/investments/${id}`,
  UPDATE: (id: string) => `/investments/${id}`,
  DELETE: (id: string) => `/investments/${id}`,
} as const;
