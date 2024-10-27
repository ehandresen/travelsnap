import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Stack } from 'expo-router';
import { globalStyles } from '@/styles/globalStyles';
import { PostContext } from '@/context/PostContext';
import * as postApi from '@/api/postApi';
import PostModal from '@/components/PostModal';
import { PostType } from '@/types/postType';

const HomeScreen = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('');
  }

  const { posts, setPosts } = context;

  return (
    <View style={globalStyles.centerContainer}>
      {/* screen options */}
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => setIsPostModalOpen(true)}>
              <Text
                style={{
                  paddingRight: 24,
                  fontWeight: '500',
                  fontSize: 22,
                }}
              >
                +
              </Text>
            </Pressable>
          ),
        }}
      />

      {/* post modal */}
      <Modal
        visible={isPostModalOpen}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={() => console.log()}
      >
        <PostModal
          onClose={() => setIsPostModalOpen(false)}
          onSave={(post: PostType) => postApi.createPost(post)}
        />
      </Modal>

      <Text style={{ color: '#ffffff' }}>{posts}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
