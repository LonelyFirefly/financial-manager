import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useCategories, useDeleteCategory } from '@/hooks';
import { CategoryTable } from './CategoryTable';
import './categories.css';
export function Categories() {
    const { categories, error, loading } = useCategories();
    const { mutate: deleteCategory } = useDeleteCategory();
    const { essentialCategories, nonEssentialCategories, essentialTotal, nonEssentialTotal, } = useMemo(() => {
        if (!categories) {
            return {
                essentialCategories: [],
                nonEssentialCategories: [],
                essentialTotal: 0,
                nonEssentialTotal: 0,
            };
        }
        const [essential, nonEssential] = getCategories(categories);
        const essentialTotal = getTotalValue(essential);
        const nonEssentialTotal = getTotalValue(nonEssential);
        return {
            essentialCategories: essential,
            nonEssentialCategories: nonEssential,
            essentialTotal,
            nonEssentialTotal,
        };
    }, [categories]);
    const handleEdit = (category) => {
        console.log('Edit category:', category);
        // TODO: Implement edit functionality
    };
    const handleDelete = (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCategory(categoryId);
        }
    };
    if (loading) {
        return (_jsx("div", { className: 'categories-loading', children: _jsx("p", { children: "Loading categories..." }) }));
    }
    if (error) {
        return (_jsx("div", { className: 'categories-error', children: _jsxs("p", { children: ["Error: ", error] }) }));
    }
    return (_jsxs("div", { className: 'categories-container', children: [_jsx("h1", { className: 'categories-title', children: "Financial Categories" }), _jsxs("div", { className: 'categories-summary', children: [_jsxs("div", { className: 'summary-card', children: [_jsx("h3", { children: "Essential Total" }), _jsxs("p", { className: 'total-amount essential', children: ["$", essentialTotal] })] }), _jsxs("div", { className: 'summary-card', children: [_jsx("h3", { children: "Non-Essential Total" }), _jsxs("p", { className: 'total-amount non-essential', children: ["$", nonEssentialTotal] })] }), _jsxs("div", { className: 'summary-card', children: [_jsx("h3", { children: "Grand Total" }), _jsxs("p", { className: 'total-amount grand', children: ["$", essentialTotal + nonEssentialTotal] })] })] }), _jsxs("div", { className: 'categories-tables', children: [_jsx(CategoryTable, { title: 'Essential Categories', categories: essentialCategories, totalValue: essentialTotal, onEdit: handleEdit, onDelete: handleDelete }), _jsx(CategoryTable, { title: 'Non-Essential Categories', categories: nonEssentialCategories, totalValue: nonEssentialTotal, onEdit: handleEdit, onDelete: handleDelete })] })] }));
}
function filterCategoriesByType(categories, type) {
    return categories.filter((category) => category.type === type);
}
function getCategories(categories) {
    const essential = filterCategoriesByType(categories, 'essential');
    const nonEssential = filterCategoriesByType(categories, 'non-essential');
    return [essential, nonEssential];
}
function getTotalValue(categories) {
    return categories.reduce((sum, category) => sum + (category.value || 0), 0);
}
