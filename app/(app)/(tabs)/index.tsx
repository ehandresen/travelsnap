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
import { useAuthSession } from '@/context/AuthContext';

const HomeScreen = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const { posts, refreshing, fetchPosts } = usePostContext();

  const { usernameSession, signOut } = useAuthSession();

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
          headerLeft: () => (
            <Text
              style={{
                paddingLeft: 24,
                fontWeight: '500',
                fontSize: 22,
              }}
            >
              {usernameSession}
            </Text>
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
        <Pressable onPress={signOut}>
          <Text>Post count: {posts.length}</Text>
        </Pressable>
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
