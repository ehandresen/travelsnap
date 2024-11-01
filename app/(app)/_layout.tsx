import { useAuthSession } from '@/context/AuthContext';
import { PostProvider } from '@/context/PostContext';
import { Redirect, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function AppLayout() {
  const { usernameSession, isLoading } = useAuthSession();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>loading...</Text>
      </View>
    );
  }

  if (!usernameSession) {
    return <Redirect href="/authentication" />;
  }

  return (
    <PostProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: 'Home',
          }}
        />
      </Stack>
    </PostProvider>
  );
}
