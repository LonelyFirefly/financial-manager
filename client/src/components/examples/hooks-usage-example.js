import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useCategories } from '@/hooks'; // Business hooks
import { useDebounce, useLocalStorage, useClickOutside } from '@/utils'; // Utility hooks
/**
 * Example component demonstrating the new hook organization:
 * - Business hooks from @hooks (domain-specific logic)
 * - Utility hooks from @utils (reusable primitives)
 */
export function HooksUsageExample() {
    // Business hook - domain-specific category logic
    const { categories, loading, error } = useCategories();
    // Utility hooks - generic, reusable functionality
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [theme, setTheme] = useLocalStorage('app-theme', 'light');
    const dropdownRef = useClickOutside(() => {
        console.log('Clicked outside dropdown');
    });
    if (loading)
        return _jsx("div", { children: "Loading..." });
    if (error)
        return _jsxs("div", { children: ["Error: ", error] });
    return (_jsxs("div", { className: `app ${theme}`, children: [_jsx("h2", { children: "Hooks Organization Example" }), _jsxs("button", { onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'), children: ["Current theme: ", theme] }), _jsx("input", { type: "text", placeholder: "Search categories...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsxs("p", { children: ["Debounced search: ", debouncedSearch] }), _jsx("div", { ref: dropdownRef, style: { border: '1px solid #ccc', padding: '10px' }, children: "Click outside me to see console log" }), _jsx("ul", { children: categories
                    .filter(cat => cat.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
                    .map((category) => (_jsx("li", { children: category.name }, category.id))) })] }));
}
