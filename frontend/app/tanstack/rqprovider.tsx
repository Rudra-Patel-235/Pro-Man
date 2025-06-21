import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './authContext';

export const queryClient = new QueryClient();

const RQProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster position='top-right' richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default RQProvider; 