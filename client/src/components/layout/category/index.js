import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { useCategories } from '@/hooks';
import './category.css';
export function Category() {
    const { categories } = useCategories();
    const { id } = useParams();
    const categoryId = parseInt(id !== null && id !== void 0 ? id : '0');
    const category = categories === null || categories === void 0 ? void 0 : categories.find(category => {
        const result = categoryId === parseInt(category.id);
        return result;
    });
    if (!category) {
        return _jsx("div", { children: "Category not found" });
    }
    return (_jsxs("div", { className: 'category-container', children: [_jsx("h1", { className: 'category-title', children: category.name }), _jsx("p", { className: 'category-description', children: category.description }), _jsx("p", { className: 'category-value', children: category.value }), (category === null || category === void 0 ? void 0 : category.image) && _jsx("img", { src: category === null || category === void 0 ? void 0 : category.image, alt: category.name })] }));
}
