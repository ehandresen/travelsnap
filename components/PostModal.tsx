import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import React from 'react';
import { PostType } from '@/types/postType';
import { useState } from 'react';
import { usePostContext } from '@/context/PostContext';
import * as ImagePicker from 'expo-image-picker';
import * as imageApi from '@/api/imageApi';

type PostModalType = {
  onClose: () => void;
  onSave: (post: PostType) => Promise<void>;
};

const PostModal = ({ onClose, onSave }: PostModalType) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const { fetchPosts } = usePostContext();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log('image uri:', result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const newPost: PostType = {
      id: Math.random().toFixed(7).toString(),
      title,
      description,
      hashtags,
      imageUrl: image || '',
    };

    if (image) {
      await imageApi.uploadImageToFirebase(image);
    }
    await onSave(newPost);
    fetchPosts();
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Post</Text>
      <Button title="pick image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
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
  image: {
    height: 200,
    width: 200,
  },
});
