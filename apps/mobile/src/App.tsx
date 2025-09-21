import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button as RNButton, AppState, AppStateStatus } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { QueryClientProvider, Hydrate, dehydrate, DehydratedState } from '@tanstack/react-query';
import { createQueryClient } from '@inspirasi/api';
import { createAsyncStorageAdapter, readDehydratedState, writeDehydratedState } from '@inspirasi/api';
import { LocationProvider } from '@inspirasi/ui';

export default function App() {
  // Normal app entry: do not auto-run the temporary smoke-test.
  const [showSmoke, setShowSmoke] = useState(false);

  const [isHydrated, setIsHydrated] = useState(false);
  const [dehydratedState, setDehydratedState] = useState<DehydratedState | null>(null);
  const qcRef = useRef(createQueryClient());
  useEffect(() => {
    let mounted = true;
    (async () => {
      const adapter = await createAsyncStorageAdapter();
      if (!adapter) {
        if (mounted) setIsHydrated(true);
        return;
      }
      const state = await readDehydratedState(adapter);
      if (mounted) {
        setDehydratedState(state);
        setIsHydrated(true);
      }
    })();

    const onAppState = async (next: AppStateStatus) => {
      if (next === 'background' || next === 'inactive') {
        try {
          const adapter = await createAsyncStorageAdapter();
          const dehydrated = dehydrate(qcRef.current);
          await writeDehydratedState(adapter, dehydrated);
        } catch (e) {
          // swallow
        }
      }
    };

    const sub = AppState.addEventListener('change', onAppState);
    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);

  if (!isHydrated) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading…</Text>
      </View>
    );
  }

  if (showSmoke) {
    // Only allow the smoke-test in development builds. In production the
    // screen is intentionally not loaded or exposed.
    if (!__DEV__) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ marginBottom: 12 }}>UI smoke test is only available in development builds.</Text>
          <RNButton title="Back" onPress={() => setShowSmoke(false)} />
        </View>
      );
    }

  // Lazy-require the dev-only smoke test so production bundles don't
  // statically include or expose it. Cast via unknown to avoid leaking
  // `any` into the surrounding file.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const UiSmokeTest = (require('./screens/UiSmokeTest').default as unknown) as React.ComponentType<unknown>;

    return (
      <View style={{ flex: 1 }}>
        <UiSmokeTest />
        <RNButton title="Back" onPress={() => setShowSmoke(false)} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={qcRef.current}>
      <Hydrate state={dehydratedState}>
        <LocationProvider>
          {showSmoke ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, marginBottom: 12 }}>Welcome to Inspirasi — Mobile</Text>
              <RNButton title="Open UI smoke test" onPress={() => setShowSmoke(true)} />
            </View>
          ) : (
            <AppNavigator />
          )}
        </LocationProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
