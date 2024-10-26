import { PostProvider } from '@/context/PostContext';
import { Stack } from 'expo-router';
import React from 'react';

const RootLayout = () => {
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
};

export default RootLayout;
