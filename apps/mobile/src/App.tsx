import React from 'react';
import { Text, View } from 'react-native';
// Button from @inspirasi/ui will be used later when UI components are wired for native

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Welcome to Inspirasi — Mobile</Text>
      {/* The Button import will be wired when building for native (NativeWind or RN components). */}
    </View>
  );
}
