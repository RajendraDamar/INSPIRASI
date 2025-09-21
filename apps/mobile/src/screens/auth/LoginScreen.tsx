import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../../state/auth';

type Nav = { navigation: { navigate: (s: string) => void } };

export default function LoginScreen({ navigation }: Nav) {
  const [identifier, setIdentifier] = useState('');
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20 }}>Sign in</Text>
      <TextInput value={identifier} onChangeText={setIdentifier} placeholder="email or username" style={{ borderWidth: 1, marginVertical: 12, padding: 8 }} />
      <Button
        title={loading ? 'Signing in...' : 'Sign in (dev)'}
        onPress={async () => {
          setLoading(true);
          try {
            await login(identifier || 'dev');
            navigation.navigate('Main');
          } catch (err: unknown) {
            const msg = err && typeof err === 'object' && 'message' in err ? ((err as Record<string, unknown>).message as string) : String(err);
            Alert.alert('Sign-in failed', msg ?? 'Unknown error');
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
      />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
