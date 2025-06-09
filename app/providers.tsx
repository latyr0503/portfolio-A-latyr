"use client"

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
        <Toaster richColors/>
      </Provider>
    </SessionProvider>
  );
}