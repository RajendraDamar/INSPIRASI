import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Header from '../components/Header';
import { AuthProvider } from '../lib/auth';
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';
import { createQueryClient } from '@inspirasi/api';
import { createLocalForageAdapter, readDehydratedState, writeDehydratedState } from '@inspirasi/api';
import { LocationProvider } from '@inspirasi/ui';

const queryClient = createQueryClient();



export default function App({ Component, pageProps }: AppProps) {
  const [hydration, setHydration] = React.useState<DehydratedState | null>(null);

  React.useEffect(() => {
    let mounted = true;
    async function init() {
      // client-side only
      const adapter = await createLocalForageAdapter();
      if (!adapter) return;
      const state = await readDehydratedState(adapter);
      if (mounted && state) setHydration(state);

      // write-back on unload
      const onUnload = async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await writeDehydratedState(adapter, state as DehydratedState | null);
        } catch (e) {
          // ignore
        }
      };
      window.addEventListener('beforeunload', onUnload);
    }
    init();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={hydration}>
        <AuthProvider>
          <LocationProvider>
            <Header />
            <Component {...pageProps} />
          </LocationProvider>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
