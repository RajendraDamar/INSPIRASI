import React from 'react';
import { View, Text, Pressable } from 'react-native';

const TOKENS = {
  primary600: '#2563eb',
  surfaceIdle: '#EEEEEE',
  textOnPrimary: '#FFFFFF',
  textOnSurface: '#000000'
};

export const Tabs: React.FC<{ tabs: string[]; active?: number } > = ({ tabs, active = 0 }) => (
  <View style={{ flexDirection: 'row' }}>
    {tabs.map((t, i) => (
      <Pressable key={t} style={{ padding: 8, marginRight: 6, borderRadius: 6, backgroundColor: i === active ? TOKENS.primary600 : TOKENS.surfaceIdle }}>
        <Text style={{ color: i === active ? TOKENS.textOnPrimary : TOKENS.textOnSurface }}>{t}</Text>
      </Pressable>
    ))}
  </View>
);

export default Tabs;
