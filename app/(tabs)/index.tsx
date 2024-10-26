import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
