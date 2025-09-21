import React from 'react';
import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';

export type ButtonProps = React.ComponentProps<typeof Pressable> & { children?: React.ReactNode };

import { tokens as TOKENS } from './tokens';

export const Button = ({ children, style, ...props }: ButtonProps) => (
  <Pressable
    {...props}
    // Pressable's style can be a function; coerce to StyleProp<ViewStyle> for typing
    style={[{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, backgroundColor: TOKENS.primary600 }, style as StyleProp<ViewStyle>]}
  >
    <Text style={{ color: 'white' }}>{children}</Text>
  </Pressable>
);

export default Button;
