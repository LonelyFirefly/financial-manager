import { RouteObject } from 'react-router-dom';
import { Categories, Category } from '@/components/layout';

const NotFound = () => null;

export const routerConfig: RouteObject[] = [
  {
    path: '/categories',
    element: <Categories />,
  },
  {
    path: '/categories/:id',
    element: <Category />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
