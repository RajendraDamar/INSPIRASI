import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useReports, addReport, pushToQueue, pickAdapter, Report } from '@inspirasi/api';
import { useAuth } from '../state/auth';
import { useQueryClient } from '@tanstack/react-query';

type Nav = { navigation: { navigate: (s: string) => void } };

export default function ReportsScreen({ navigation }: Nav) {
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading } = useReports();
  const qc = useQueryClient();

  useEffect(() => {
    if (!authLoading && !user) {
      navigation.navigate('Login');
    }
  }, [user, authLoading, navigation]);

  async function handleAdd() {
    const r: Report = await addReport('New report from mobile', 'Added from ReportsScreen example');
    const adapter = await pickAdapter();
    await pushToQueue(adapter, r);
    // update local cache so UI reflects new item immediately
    qc.setQueryData(['reports'], (old: Report[] | undefined) => [r, ...(old ?? [])]);
  }

  if (authLoading || isLoading || !user) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Reports</Text>
        <Text style={{ marginTop: 12 }}>Checking authentication...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Add report" onPress={handleAdd} />
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.createdAt}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  item: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 12, color: '#666' },
});
