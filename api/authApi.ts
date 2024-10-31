import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export const signIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => console.log(`user signed in: ${userCredential}`))
    .catch((error) => console.log(`could not sign in ${error}`));
};
