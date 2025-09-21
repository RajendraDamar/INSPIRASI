import React from 'react';
import { View, Text, FlatList } from 'react-native';

const sample = Array.from({ length: 8 }).map((_, i) => ({ id: String(i), title: `Report ${i + 1}`, date: Date.now() - i * 1000 * 60 * 60 * 24 }));

export default function ReportsHistoryScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Reports History</Text>
      <FlatList data={sample} keyExtractor={(i) => i.id} renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
          <Text style={{ color: '#666' }}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
      )} />
    </View>
  );
}
