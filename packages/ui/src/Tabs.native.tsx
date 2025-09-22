import React from 'react';
import { View, Text, Pressable } from 'react-native';

export const Tabs: React.FC<{ tabs: string[]; active?: number } > = ({ tabs, active = 0 }) => (
  <View style={{ flexDirection: 'row' }}>
    {tabs.map((t, i) => (
      <Pressable key={t} style={{ padding: 8, marginRight: 6, borderRadius: 6, backgroundColor: i === active ? '#2563EB' : '#EEE' }}>
        <Text style={{ color: i === active ? '#FFF' : '#000' }}>{t}</Text>
      </Pressable>
    ))}
  </View>
);

export default Tabs;
