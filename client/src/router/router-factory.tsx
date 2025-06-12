import { RouteObject } from 'react-router-dom';

import {
  CategoriesPage,
  CategoryPage,
  InvestmentsPage,
  NotFoundPage,
} from '@/pages';

const routerFactory: RouteObject[] = [
  {
    path: '/categories',
    element: <CategoriesPage />,
  },
  {
    path: '/categories/:id',
    element: <CategoryPage />,
  },
  {
    path: '/investments',
    element: <InvestmentsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routerFactory;
