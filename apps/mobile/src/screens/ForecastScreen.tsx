import React from 'react';
import { View, Text } from 'react-native';

export default function ForecastScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20 }}>Forecast</Text>
      <Text>Tabs: wave · wind · tide · weather</Text>
    </View>
  );
}
