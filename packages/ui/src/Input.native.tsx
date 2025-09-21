import React from 'react';
import { TextInput, type StyleProp, type TextStyle } from 'react-native';

export const Input: React.FC<React.ComponentProps<typeof TextInput>> = ({ style, ...props }) => (
  <TextInput {...props} style={[{ borderWidth: 1, padding: 8, borderRadius: 6 }, style as StyleProp<TextStyle>]} />
);

export default Input;
