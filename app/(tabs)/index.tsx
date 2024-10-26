import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { globalStyles } from '@/styles/globalStyles';

const HomeScreen = () => {
  return (
    <View style={globalStyles.centerContainer}>
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
