import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { queryClient } from '@/api';
import Router from '@/router';
import './App.css';
function App() {
    return (_jsx(StrictMode, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(Router, {}) }) }));
}
export default App;
