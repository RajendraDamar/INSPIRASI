import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../state/auth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20 }}>Profile</Text>
      <Text style={{ marginVertical: 8 }}>{user ? `Hello, ${user.name ?? user.id}` : 'Not signed in'}</Text>
      <Button title="Sign out" onPress={() => logout()} />
    </View>
  );
}
