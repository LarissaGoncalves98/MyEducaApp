import { Stack } from 'expo-router';

export default function GamesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#6c63ff' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    />
  );
}