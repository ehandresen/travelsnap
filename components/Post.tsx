import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { PostType } from '@/types/postType';

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  return (
    <View style={styles.container}>
      {/* Image */}
      <Image source={{ uri: post.imageUrl }} style={styles.image} />

      {/* Title */}
      <Text style={styles.title}>{post.title}</Text>

      {/* Description */}
      <Text style={styles.description}>{post.description}</Text>

      {/* Hashtags */}
      <Text style={styles.hashtags}>{post.hashtags}</Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa', // Light background for each post
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    width: Dimensions.get('window').width * 0.7, // Sets width to 90% of screen width
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#e0e0e0', // Placeholder color if image fails to load
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#333',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  hashtags: {
    fontSize: 12,
    color: '#1e90ff', // Color for hashtags
  },
});
