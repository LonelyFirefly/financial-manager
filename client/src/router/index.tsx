import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routerFactory from './router-factory';

const router = createBrowserRouter(routerFactory);

export default function Router() {
  return <RouterProvider router={router} />;
}
