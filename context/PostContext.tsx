import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type PostContextType = {
  posts: string;
  setPosts: Dispatch<SetStateAction<string>>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState('name from context');

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
