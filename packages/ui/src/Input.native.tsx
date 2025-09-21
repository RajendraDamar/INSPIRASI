import React from 'react';
import { TextInput, type StyleProp, type TextStyle } from 'react-native';

const TOKENS = {
  border: '#D1D5DB', // tailwind gray-300
  surfaceLight: '#ffffff',
  textDark: '#000000'
};

export const Input: React.FC<React.ComponentProps<typeof TextInput>> = ({ style, ...props }) => (
  <TextInput
    {...props}
    style={[{ borderWidth: 1, padding: 8, borderRadius: 6, borderColor: TOKENS.border, backgroundColor: TOKENS.surfaceLight, color: TOKENS.textDark }, style as StyleProp<TextStyle>]}
  />
);

export default Input;
