import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Minimal route typing to keep this component strongly typed without
// depending on generated types. Expand or import the shared type when available.
type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Forecasts: undefined;
  Reports: undefined;
  Profile: undefined;
  Register: undefined;
};

export default function HeaderRight() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ marginRight: 8 }}>Bali</Text>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Search" style={{ marginRight: 8 }} onPress={() => navigation.navigate('Forecasts')}>
        <Text>🔍</Text>
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Reports" style={{ marginRight: 8 }} onPress={() => navigation.navigate('Reports')}>
        <Text>🔔</Text>
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Profile" onPress={() => navigation.navigate('Profile')}>
        <Text>👤</Text>
      </TouchableOpacity>
    </View>
  );
}
