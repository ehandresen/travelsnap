import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React from 'react';
import { PostType } from '@/types/postType';
import { useState } from 'react';
import { usePostContext } from '@/context/PostContext';

type PostModalType = {
  onClose: () => void;
  onSave: (post: PostType) => Promise<void>;
};

// TODO add imagePicker option

const PostModal = ({ onClose, onSave }: PostModalType) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');

  const { fetchPosts } = usePostContext();

  const handleSave = async () => {
    const newPost: PostType = {
      id: Math.random().toFixed(7).toString(),
      title,
      description,
      hashtags,
      imageUrl: 'imageurl',
    };

    await onSave(newPost);
    fetchPosts();
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Post</Text>
      <TextInput
        style={styles.input}
        placeholder="title.."
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="description.."
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="#hashtags.."
        placeholderTextColor="#999"
        value={hashtags}
        onChangeText={setHashtags}
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Close" onPress={onClose} />
    </View>
  );
};

export default PostModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    // color: 'lightblue',
  },
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    padding: 10,
    // color: 'white',
  },
});
