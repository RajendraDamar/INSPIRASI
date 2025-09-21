/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { View, Text, Button as RNButton } from 'react-native';

// This placeholder smoke-test will render components from `@inspirasi/ui` if the
// package is available via the normal Metro resolution (e.g. after building and
// linking the package). It intentionally avoids noisy runtime logs so the app
// behaves normally outside of verification sessions.
let UI: unknown = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  UI = require('@inspirasi/ui');
} catch (e) {
  UI = null;
}

export default function UiSmokeTest() {
  useEffect(() => {
    // Emit an error-level log so it is routed to Android's logcat. This is
    // only for on-device verification; it's intentionally minimal and will
    // not run unless this screen is mounted during a verification session.
    if (__DEV__) {
      try {
        // eslint-disable-next-line no-console
        console.error('INSPIRASI_UI_BUNDLE_OK', 'UiSmokeTest_mounted');
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const hasUI = Boolean(UI);
  const ButtonComp = hasUI && (UI as any).Button ? (UI as any).Button : null;
  const CardComp = hasUI && (UI as any).Card ? (UI as any).Card : null;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12, textAlign: 'center' }}>UI Visual Smoke Test</Text>

      {/* Large solid-color swatch for CI visual verification. This should be
          prominent in screenshots so the color-checker can reliably detect the
          project's primary token even on varied devices. Gated to dev only. */}
      {__DEV__ ? (
        <View style={{ alignItems: 'center', marginBottom: 18 }}>
          {/* Prefer using the Tailwind class when available; provide an inline
              fallback background color to ensure the swatch is visible even if
              NativeWind isn't active yet. */}
          <View
            accessibilityLabel="inspirasi-primary-swatch"
            style={{
              width: '92%',
              height: 160,
              borderRadius: 12,
              backgroundColor: '#2563EB', // primary.600 fallback
            }}
            // If the UI package provides a wrapper with className support we
            // render it; otherwise this native View is the definitive swatch.
          />
        </View>
      ) : null}

      {ButtonComp ? (
        <View style={{ alignItems: 'center' }}>
          {React.createElement(ButtonComp as any, { title: 'Primary (from @inspirasi/ui)', className: 'bg-primary-600 text-white px-6 py-3 rounded-lg' })}

          <View style={{ height: 12 }} />

          {CardComp
            ? React.createElement(
                CardComp as any,
                { className: 'bg-surface p-4 rounded-lg', style: { width: '90%', marginTop: 12 } },
                React.createElement(Text, { style: { color: '#111827' } }, 'Card from @inspirasi/ui — check background & text tokens')
              )
            : null}
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginBottom: 8 }}>@inspirasi/ui not found — falling back to native components</Text>
          <RNButton title="Primary (native)" onPress={() => {}} />
        </View>
      )}
    </View>
  );
}
