import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as postApi from '@/api/postApi';
import { PostType } from '@/types/postType';
import Post from '@/components/Post';

const PostDetails = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    getPostFromFirebase();
  }, []);

  const getPostFromFirebase = async () => {
    const post = await postApi.getPostById(id as string);

    if (post) {
      setPost(post);
    }
  };

  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Details',
        }}
      />
      {post && <Post post={post} />}
    </View>
  );
};

export default PostDetails;
