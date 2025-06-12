import { RouteObject } from 'react-router-dom';
import { CategoriesPage, CategoryPage, NotFoundPage } from '@/pages';

export const routerConfig: RouteObject[] = [
  {
    path: '/categories',
    element: <CategoriesPage />,
  },
  {
    path: '/categories/:id',
    element: <CategoryPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
