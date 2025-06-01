import { StrictMode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api';
import Router from '@/router';

import './App.css'

function App() {
  return (
     <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App
