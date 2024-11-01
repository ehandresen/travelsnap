import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import * as postApi from '@/api/postApi';
import { PostType } from '@/types/postType';
import Post from '@/components/Post';
import { usePostContext } from '@/context/PostContext';

const PostDetails = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const { id } = useLocalSearchParams();
  const { fetchPosts } = usePostContext();

  useEffect(() => {
    getPostFromFirebase();
  }, []);

  const getPostFromFirebase = async () => {
    console.log(`id bedfore fetch: ${id}`);
    const post = await postApi.getPostById(id as string);
    console.log('post in [id]:', post);

    if (post) {
      setPost(post);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('deleting...');
      await postApi.deletePost(id);
      fetchPosts();
      router.back();
    } catch (error) {
      console.log('could not delete post');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen
        options={{
          title: 'Details',
          headerRight: () => (
            <Pressable
              onPress={() => handleDelete(id as string)}
              style={{ paddingRight: 12 }}
            >
              <Text style={{ color: 'red', fontWeight: 'bold' }}>delete</Text>
            </Pressable>
          ),
        }}
      />
      {post && <Post post={post} />}
    </View>
  );
};

export default PostDetails;
