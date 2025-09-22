import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { tokens as TOKENS } from './tokens';

export const Tabs: React.FC<{ tabs: string[]; active?: number } > = ({ tabs, active = 0 }) => (
  <View style={{ flexDirection: 'row' }}>
    {tabs.map((t, i) => (
      <Pressable key={t} style={{ padding: 8, marginRight: 6, borderRadius: 6, backgroundColor: i === active ? TOKENS.primary600 : TOKENS.surfaceIdle }}>
        <Text style={{ color: i === active ? TOKENS.textOnPrimary : TOKENS.textDark }}>{t}</Text>
      </Pressable>
    ))}
  </View>
);

export default Tabs;
