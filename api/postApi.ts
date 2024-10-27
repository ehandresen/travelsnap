import { PostType } from '@/types/postType';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export const createPost = async (post: PostType) => {
  try {
    // reference to the new document we are gonna create
    const docRef = await addDoc(collection(db, 'posts'), post);
    console.log('document written with ID:', docRef.id);
  } catch (e) {
    console.log('error adding document', e);
  }
};
