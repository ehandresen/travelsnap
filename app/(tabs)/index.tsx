import {
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
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
  const { posts, refreshing, fetchPosts } = usePostContext();

  return (
    <View style={globalStyles.centerContainer}>
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
          }
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: '/postDetails/[id]',
                params: { id: item.id },
              }}
            >
              <Post post={item} />
            </Link>
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
