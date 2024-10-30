import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseEnv';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//  Initializes Firestore and exports it so you can interact with the database in other files.
export const db = getFirestore(app);

// Initializes Firebase Storage but doesn’t export it directly.
const storage = getStorage(app);

// A helper function to create references to specific file paths in Firebase Storage. You call getStorageRef('path/to/file') to get a reference for that file location.
export const getStorageRef = (path) => ref(storage, path);
// getStorageRef(path) is a function you call when you need to reference or upload files to Firebase Storage at a specific path.
