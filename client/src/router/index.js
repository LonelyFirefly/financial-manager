import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routerFactory from './router-factory';
const router = createBrowserRouter(routerFactory);
export default function Router() {
    return _jsx(RouterProvider, { router: router });
}
