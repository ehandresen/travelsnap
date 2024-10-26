import { View, Text } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

const PostDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Details',
        }}
      />
      <Text>ID: {id}</Text>
    </View>
  );
};

export default PostDetails;
