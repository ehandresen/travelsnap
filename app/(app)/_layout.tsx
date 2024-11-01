import { PostProvider } from '@/context/PostContext';
import { Stack } from 'expo-router';

export default function AppLayout() {
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
