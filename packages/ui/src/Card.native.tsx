import React from 'react';
import { View } from 'react-native';

const TOKENS = {
  surfaceLight: '#ffffff',
  surfaceDark: '#111827'
};

export const Card: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <View style={{ padding: 16, borderRadius: 8, backgroundColor: TOKENS.surfaceLight, elevation: 2 }}>{children}</View>
);

export default Card;
