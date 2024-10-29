import { PostType } from '@/types/postType';
import { addDoc, collection, getDocs } from 'firebase/firestore';
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

export const getAllPosts = async () => {
  try {
    const queryResult = await getDocs(collection(db, 'posts'));

    return queryResult.docs.map((doc) => {
      // we know the data will have the same properties as PostType
      return doc.data() as PostType;
    });
  } catch (e) {}
};

// TODO getpost by id, delete post
