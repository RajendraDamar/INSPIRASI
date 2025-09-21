import React, { useState } from 'react';
import { Text, View, Button as RNButton } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  // Normal app entry: do not auto-run the temporary smoke-test.
  const [showSmoke, setShowSmoke] = useState(false);

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
    // When not running the dev-only smoke test, render the full app navigator.
    showSmoke ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>Welcome to Inspirasi — Mobile</Text>
        <RNButton title="Open UI smoke test" onPress={() => setShowSmoke(true)} />
      </View>
    ) : (
      <AppNavigator />
    )
  );
}
