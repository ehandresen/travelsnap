import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { Link } from 'expo-router';
import { globalStyles } from '@/styles/globalStyles';
import { PostContext } from '@/context/PostContext';

const HomeScreen = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('');
  }

  const { posts, setPosts } = context;

  return (
    <View style={globalStyles.centerContainer}>
      <Text>{posts}</Text>
      <Link href="/postDetails/1">Link</Link>
      <Link
        href={{
          pathname: '/postDetails/[id]',
          params: { id: 'banana' },
        }}
      >
        Link 2
      </Link>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
