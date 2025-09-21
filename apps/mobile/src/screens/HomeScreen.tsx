import React from 'react';
import { View, Text, Button } from 'react-native';

type Nav = { navigation: { navigate: (s: string) => void } };

export default function HomeScreen({ navigation }: Nav) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Home</Text>
  <Button title="Open Forecast" onPress={() => navigation.navigate('Forecasts')} />
      <Button title="Open Reports" onPress={() => navigation.navigate('Reports')} />
    </View>
  );
}
