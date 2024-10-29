import { getStorageRef } from '@/firebaseConfig';
import { uploadBytes } from 'firebase/storage';

export const uploadImageToFirebase = async (uri: string) => {
  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();

  const imagePath = uri.split('/').pop()?.split('.')[0] ?? '';

  // hvor i databasen bilde skal ligge
  const uploadPath = `images/${imagePath}`;

  const imageRef = getStorageRef(uploadPath);

  try {
    await uploadBytes(imageRef, blob);
    console.log('uploading image to', uploadPath);
  } catch (error) {
    console.log('error uploading image', error);
  }
};
