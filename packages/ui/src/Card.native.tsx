import React from 'react';
import { View } from 'react-native';

export const Card: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <View style={{ padding: 16, borderRadius: 8, backgroundColor: '#fff', elevation: 2 }}>{children}</View>
);

export default Card;
