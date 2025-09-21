import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../state/auth';

type Nav = { navigation: { navigate: (s: string) => void } };

export default function ReportsScreen({ navigation }: Nav) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigation.navigate('Login');
    }
  }, [user, loading, navigation]);

  if (loading || !user) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Reports</Text>
        <Text style={{ marginTop: 12 }}>Checking authentication...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20 }}>Reports</Text>
      <Button title="History" onPress={() => navigation.navigate('ReportsHistory')} />
    </View>
  );
}
