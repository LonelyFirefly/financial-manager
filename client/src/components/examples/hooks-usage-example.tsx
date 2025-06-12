import React, { useState } from 'react'

import { useCategories } from '@/hooks' // Business hooks
import { useDebounce, useLocalStorage, useClickOutside } from '@/utils' // Utility hooks

/**
 * Example component demonstrating the new hook organization:
 * - Business hooks from @hooks (domain-specific logic)
 * - Utility hooks from @utils (reusable primitives)
 */
export function HooksUsageExample() {
  // Business hook - domain-specific category logic
  const { categories, loading, error } = useCategories()
  
  // Utility hooks - generic, reusable functionality
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)
  const [theme, setTheme] = useLocalStorage('app-theme', 'light')
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    console.log('Clicked outside dropdown')
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className={`app ${theme}`}>
      <h2>Hooks Organization Example</h2>
      
      {/* Theme Toggle - using utility hook */}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Current theme: {theme}
      </button>
      
      {/* Search - using utility hook */}
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>Debounced search: {debouncedSearch}</p>
      
      {/* Dropdown - using utility hook */}
      <div ref={dropdownRef} style={{ border: '1px solid #ccc', padding: '10px' }}>
        Click outside me to see console log
      </div>
      
      {/* Categories - using business hook */}
      <ul>
        {categories
          .filter(cat => 
            cat.name.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
      </ul>
    </div>
  )
} 