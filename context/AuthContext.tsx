import { auth } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

type AuthContextType = {};

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userSession, setUserSession] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user.email);
      } else {
        setUserSession(null);
      }

      // setisloading --> false
    });
  }, []);

  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
