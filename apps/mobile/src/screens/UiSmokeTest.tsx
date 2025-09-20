import React from 'react';
import { View, Text, Button as RNButton } from 'react-native';

// Use runtime require so TypeScript doesn't fail if @inspirasi/ui types aren't available
let UI: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  UI = require('@inspirasi/ui');
} catch (e) {
  UI = null;
}

// ...existing code...

export default function UiSmokeTest() {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>UI Smoke Test</Text>
      {UI && UI.Card ? (
        <UI.Card style={{ padding: 16, backgroundColor: '#ffffff', borderRadius: 8 }}>
          <Text style={{ color: '#374151', marginBottom: 8 }}>This tests components imported from @inspirasi/ui</Text>
          {/* render the library Button if available */}
          {UI.Button ? (
            <UI.Button title="Primary" className="bg-blue-600 text-white px-4 py-2 rounded" />
          ) : (
            <RNButton title="Primary" onPress={() => {}} />
          )}
        </UI.Card>
      ) : (
        <View style={{ padding: 12, backgroundColor: '#ffffff', borderRadius: 8 }}>
          <Text style={{ color: '#374151', marginBottom: 8 }}>@inspirasi/ui not found — falling back to native components</Text>
          <RNButton title="Primary" onPress={() => {}} />
        </View>
      )}
    </View>
  );
}
