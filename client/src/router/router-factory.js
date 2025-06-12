import { jsx as _jsx } from "react/jsx-runtime";
import { CategoriesPage, CategoryPage, InvestmentsPage, NotFoundPage, } from '@/pages';
const routerFactory = [
    {
        path: '/categories',
        element: _jsx(CategoriesPage, {}),
    },
    {
        path: '/categories/:id',
        element: _jsx(CategoryPage, {}),
    },
    {
        path: '/investments',
        element: _jsx(InvestmentsPage, {}),
    },
    {
        path: '*',
        element: _jsx(NotFoundPage, {}),
    },
];
export default routerFactory;
