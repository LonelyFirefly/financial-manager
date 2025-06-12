import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';

import { queryClient } from '@/api';
import Router from '@/router';

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
