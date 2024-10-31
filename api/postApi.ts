import { PostType } from '@/types/postType';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { db, getDownloadUrl } from '@/firebaseConfig';
import { uploadImageToFirebase } from './imageApi';

export const createPost = async (post: PostType) => {
  try {
    const firebaseImage = await uploadImageToFirebase(post.imageUrl);

    if (firebaseImage === 'error') {
      return;
    }

    const postImageDownloadUrl = await getDownloadUrl(firebaseImage);

    const postWithImageData: PostType = {
      ...post,
      imageUrl: postImageDownloadUrl,
    };

    // reference to the new document we are gonna create
    const docRef = await addDoc(collection(db, 'posts'), postWithImageData);
    console.log('document written with ID:', docRef.id);
  } catch (e) {
    console.log('error adding document', e);
  }
};

// This function thus returns an array of all documents in posts, where each object includes all the document’s data fields plus an id field with the document’s Firestore ID.
export const getAllPosts = async () => {
  try {
    const queryResult = await getDocs(collection(db, 'posts'));

    return queryResult.docs.map((doc) => {
      // we know the data will have the same properties as PostType
      /*  •	This creates a new object that includes all the properties of the      document (doc.data()) and adds a field id set to the Firestore document’s unique id.
      •	Using as PostType casts the object to a TypeScript type, PostType, ensuring that TypeScript treats it as matching the properties of PostType. */
      return {
        ...doc.data(),
        id: doc.id,
      } as PostType;
    });
  } catch (e) {}
};

export const getPostById = async (id: string) => {
  try {
    // •	db is the reference to your Firestore database.
    // •	'posts' is the name of the collection containing the document.
    // •	id is the unique identifier of the specific document within the posts collection.
    const post = await getDoc(doc(db, 'posts', id));
    console.log('post by id', post.data());

    return {
      ...post.data(),
      id: post.id,
    } as PostType;
  } catch (error) {
    console.log(`error fetching post with id: ${id}`, error);
  }
};

export const deletePost = async (id: string) => {
  try {
    // await deleteDoc(doc);
  } catch (error) {
    console.log(`could not delete doc with id ${id}`, error);
  }
};
