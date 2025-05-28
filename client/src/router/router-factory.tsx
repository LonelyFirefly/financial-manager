import { RouteObject } from "react-router-dom";
import { Categories } from '@/components/layout';

const NotFound = () => null;

export const routerConfig: RouteObject[] = [
    {
      path: '/categories',
      element: <Categories />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]