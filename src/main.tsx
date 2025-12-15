import './css/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/josefin-slab/400.css";
import "@fontsource/josefin-slab/700.css";
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
