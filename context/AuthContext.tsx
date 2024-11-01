import { auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as authApi from '@/api/authApi';

type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signOut: VoidFunction;
  usernameSession?: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuthSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error(
      'useAuthSession must be used within an AuthContext Provider'
    );
  }

  return value;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userSession, setUserSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user.email);
      } else {
        setUserSession(null);
      }
      router.replace('/');
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          await authApi.signIn(email, password);
        },
        signOut: () => {
          setUserSession(null);
        },
        usernameSession: userSession,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthSession, AuthProvider };
