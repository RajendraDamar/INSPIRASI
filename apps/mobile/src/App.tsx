import React, { useState } from 'react';
import { Text, View, Button as RNButton } from 'react-native';

// runtime require to avoid type errors when types for @inspirasi/ui aren't available
let UI: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  UI = require('@inspirasi/ui');
} catch (e) {
  UI = null;
}

import UiSmokeTest from './screens/UiSmokeTest';

export default function App() {
  const [showSmoke, setShowSmoke] = useState(false);

  if (showSmoke) {
    return (
      <View style={{ flex: 1 }}>
        <UiSmokeTest />
        <RNButton title="Back" onPress={() => setShowSmoke(false)} />
      </View>
    );
  }

  const Button = UI && UI.Button ? UI.Button : RNButton;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Welcome to Inspirasi — Mobile</Text>
      <Button title="Open UI smoke test" onPress={() => setShowSmoke(true)} />
    </View>
  );
}
