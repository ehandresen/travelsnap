import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Stack } from 'expo-router';
import { globalStyles } from '@/styles/globalStyles';
import { PostContext, usePostContext } from '@/context/PostContext';
import PostModal from '@/components/PostModal';
import { PostType } from '@/types/postType';
import Post from '@/components/Post';
import * as postApi from '@/api/postApi';

const HomeScreen = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const { posts, setPosts } = usePostContext();

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
        onRequestClose={() => setIsPostModalOpen(false)}
      >
        <PostModal
          onClose={() => setIsPostModalOpen(false)}
          onSave={(post: PostType) => postApi.createPost(post)}
        />
      </Modal>

      {/* list of posts */}
      <View>
        <Text>Post count: {posts.length}</Text>
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post post={item} />}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
